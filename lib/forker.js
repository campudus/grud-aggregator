'use strict';

require('babel-register');
var errors = require('./errorCodes.js');

process.on('message', function (event) {
  switch (event.action) {
    case 'run':
      // mkDirs(event.data.dataDirectory);
      run(event.data.aggregatorFile, event.data.options);
      break;
    default:
      process.exit(errors.UNKNOWN_ACTION);
      break;
  }
});

function run(aggregatorFile, options) {

  var allSteps = 1;
  var lastStep = 0;

  try {
    var aggregator = require(aggregatorFile);
    aggregator(step, progress, options).then(function () {
      process.send({
        action: 'DONE',
        payload: {
          error: false,
          message: 'Done.',
          currentStep: allSteps,
          steps: allSteps
        }
      });
    }).catch(function (err) {
      console.error('Error during aggregation', err);
      process.exit(3);
    });

    process.send({
      action: 'INIT',
      payload: {
        stepsInAggregator: allSteps
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

    return function (data) {
      lastStep = lastStep + 1;
      process.send({
        action: 'PROGRESS',
        payload: {
          message: message,
          currentStep: lastStep,
          steps: allSteps
        }
      });
      return data;
    };
  }

  function progress(error, message, currentStepProgress) {
    process.send({
      action: 'PROGRESS',
      payload: {
        error: error,
        message: message,
        currentStep: lastStep + currentStepProgress,
        steps: allSteps
      }
    });
  }
}