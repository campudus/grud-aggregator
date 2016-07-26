import _ from 'lodash';
import cp from 'child_process';

export function start({
  aggregator,
  progress
} = {}) {

  if (_.isNil(aggregator) || _.isEmpty(aggregator)) {
    throw new Error('Need to supply the filename of the aggregator');
  }

  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error('Expects function for optional `progress` parameter');
  }

  return Promise.resolve()
    .then(() => new Promise((resolve, reject) => {
      const child = cp.fork(`${__dirname}/forker.js`, [aggregator], {silent : false});
      let initialized = false;
      let fulfilled = false;
      let allDone = false;
      let allSteps = 0;

      child.on('message', ({action, payload}) => {
        if (action === 'INIT') {
          initialized = true;
          allSteps = payload.stepsInAggregator;
          if (progress) {
            progress({
              message : `Starting aggregator ${aggregator}`,
              currentStep : 0,
              steps : allSteps
            });
          }
        } else if (action === 'PROGRESS' && progress) {
          progress(payload);
        } else if (action === 'DONE') {
          if (progress) {
            progress(payload);
          }
          allDone = true;
          child.kill();
        }
      });
      child.on('close', fulfill);

      child.on('error', err => {
        if (!fulfilled) {
          fulfilled = true;
          console.log(`Aggregator broke due to an uncaught error ${err.message}`);
          reject(err);
        }
      });

      child.on('exit', fulfill);

      function fulfill(code, signal) {
        if (!fulfilled) {
          fulfilled = true;
          if (allDone) {
            resolve();
          } else if (!initialized) {
            reject(new Error(`Could not start up aggregator ${aggregator}. Correct path? Uncaught exception in init?`));
          } else if (signal !== null) {
            reject(new Error(`Aggregator got killed with signal ${signal}`));
          } else if (code !== 0) {
            reject(new Error(`Aggregator broke, possible uncaught exception. Exit code ${code}`));
          } else {
            resolve({code, signal});
          }
        }
      }

    }));

}
