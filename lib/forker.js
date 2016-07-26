'use strict';

var file = process.argv[2];
require('babel-register');
var errors = require('./errorCodes.js');

var allSteps = 1;
var lastStep = 0;

try {
  var aggregator = require(file);
  aggregator({ step: step }).then(function () {
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