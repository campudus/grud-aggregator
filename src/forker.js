import fs from "fs-extra";
import errors from "./errorCodes.js";

process.on("message", function (event) {
  switch (event.action) {
    case "run":
      mkDirs(event.data.options.dataDirectory)
        .then(() => {
          run(event.data.aggregatorFile, event.data.options);
        })
        .catch((err) => {
          console.error("Error creating data directory.", err);
          process.exit(2);
        });
      break;
    default:
      process.exit(errors.UNKNOWN_ACTION);
      break;
  }
});

process.on("error", (error) => {
  if (error.message === "channel closed") {
    // handled.
    console.log("Channel closed in forked aggregator.", error);
  } else {
    throw error;
  }
});

function mkDirs(dataDirectory) {
  return new Promise((resolve, reject) => {
    if (dataDirectory) {
      fs.mkdirp(`${dataDirectory}/attachments`, err => {
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

async function run(aggregatorFile, options) {

  let allSteps = 1;
  let lastStep = 0;

  try {
    const aggegatorFn = await import(aggregatorFile)
      .then((aggregatorModule) => {
        const aggregator =
          typeof aggregatorModule === "function"
            ? aggregatorModule
            : aggregatorModule.default;

        return aggregator;
      });

    aggegatorFn(step, progress, options)
      .then(result => {
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
      })
      .catch(err => {
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

    return (data, options = {}) => {
      const {message: newMessage, suppress = false} = options;

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
        currentStep: lastStep + ((options.currentStep / options.steps) || 0),
        steps: allSteps
      }
    });
  }
}
