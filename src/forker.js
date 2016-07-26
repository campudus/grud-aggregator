const file = process.argv[2];
require('babel-register');
const errors = require('./errorCodes.js');

let allSteps = 1;
let lastStep = 0;

try {
  const aggregator = require(file);
  aggregator({step : step})
    .then(() => {
      process.send({
        action : 'DONE',
        payload : {
          error : false,
          message : 'Done.',
          currentStep : allSteps,
          steps : allSteps
        }
      });
    })
    .catch(err => {
      console.error('Error during aggregation', err);
      process.exit(3);
    });

  process.send({
    action : 'INIT',
    payload : {
      stepsInAggregator : allSteps
    }
  });
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    process.exit(errors.MODULE_NOT_FOUND);
  } else {
    console.error('Uncaught error during initializatin of aggregator', err);
    process.exit(2);
  }
}

function step(message) {
  allSteps = allSteps + 1;

  return data => {
    lastStep = lastStep + 1;
    process.send({
      action : 'PROGRESS',
      payload : {
        message : message,
        currentStep : lastStep,
        steps : allSteps
      }
    });
    return data;
  };
}
