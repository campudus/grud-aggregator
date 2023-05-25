"use strict";

var fs = require("fs-extra");

require("@babel/register");

var errors = require("./errorCodes.js");

process.on("message", function (event) {
  switch (event.action) {
    case "run":
      mkDirs(event.data.options.dataDirectory).then(function () {
        run(event.data.aggregatorFile, event.data.options);
      }).catch(function (err) {
        console.error("Error creating data directory.", err);
        process.exit(2);
      });
      break;

    default:
      process.exit(errors.UNKNOWN_ACTION);
      break;
  }
});
process.on("error", function (error) {
  if (error.message === "channel closed") {
    // handled.
    console.log("Channel closed in forked aggregator.", error);
  } else {
    throw error;
  }
});

function mkDirs(dataDirectory) {
  return new Promise(function (resolve, reject) {
    if (dataDirectory) {
      fs.mkdirp("".concat(dataDirectory, "/attachments"), function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

function run(aggregatorFile, options) {
  var allSteps = 1;
  var lastStep = 0;

  try {
    var aggregator = require(aggregatorFile);

    aggregator(step, progress, options).then(function (result) {
      process.send({
        action: "DONE",
        payload: {
          error: false,
          message: "Done.",
          currentStep: allSteps,
          steps: allSteps
        },
        data: result
      });
    }).catch(function (err) {
      console.error("Error during aggregation", err);
      process.exit(3);
    });
    process.send({
      action: "INIT",
      payload: {
        stepsInAggregator: allSteps
      }
    });
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      process.exit(errors.MODULE_NOT_FOUND);
    } else {
      console.error("Uncaught error during initialization of aggregator", err);
      process.exit(2);
    }
  }

  function step(message) {
    allSteps = allSteps + 1;
    return function (data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var newMessage = options.message,
          _options$suppress = options.suppress,
          suppress = _options$suppress === void 0 ? false : _options$suppress;
      lastStep = lastStep + 1;

      if (!suppress) {
        process.send({
          action: "PROGRESS",
          payload: {
            message: newMessage || message,
            currentStep: lastStep,
            steps: allSteps
          }
        });
      }

      return data;
    };
  }

  function progress(options) {
    process.send({
      action: "PROGRESS",
      payload: {
        error: options.error || false,
        message: options.message || "",
        currentStep: lastStep + (options.currentStep / options.steps || 0),
        steps: allSteps
      }
    });
  }
}