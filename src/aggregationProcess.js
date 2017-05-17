import * as _ from "lodash";
import cp from "child_process";

export function start(
  {
    aggregatorFile,
    progress,
    ...rest
  } = {}) {

  if (_.isNil(aggregatorFile) || _.isEmpty(aggregatorFile)) {
    throw new Error("Need to supply the filename of the aggregator");
  }

  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error("Expects function for optional `progress` parameter");
  }

  return Promise
    .resolve()
    .then(() => new Promise((resolve, reject) => {
      const child = cp.fork(`${__dirname}/forker.js`, {silent: false});
      let initialized = false;
      let fulfilled = false;
      let allDone = false;
      let allSteps = 0;

      child.on("message", ({action, payload}) => {
        if (action === "INIT") {
          initialized = true;
          allSteps = payload.stepsInAggregator;
          if (progress) {
            progress({
              message: `Starting aggregator ${aggregatorFile}`,
              currentStep: 0,
              steps: allSteps
            });
          }
        } else if (action === "PROGRESS" && progress) {
          progress(payload);
        } else if (action === "DONE") {
          if (progress) {
            progress(payload);
          }
          allDone = true;
          child.kill();
        }
      });

      child.on("close", fulfill);

      child.on("error", err => {
        if (!fulfilled) {
          fulfilled = true;
          console.log(`Aggregator broke due to an uncaught error ${err.message}`);
          reject(err);
        }
      });

      child.on("exit", fulfill);

      child.send({
        action: "run",
        data: {
          aggregatorFile,
          options: rest
        }
      });

      function fulfill(code, signal) {
        if (!fulfilled) {
          fulfilled = true;
          if (allDone) {
            resolve();
          } else if (!initialized) {
            reject(
              new Error(`Could not start up aggregator ${aggregatorFile}. Correct path? Uncaught exception in init?`)
            );
          } else if (signal !== null) {
            reject(new Error(`Aggregator got killed with signal ${signal}`));
          } else if (code !== 0) {
            reject(new Error(`Aggregator broke, possible uncaught exception. Exit code ${code}`));
          } else {
            resolve({
              code,
              signal
            });
          }
        }
      }

    }));

}
