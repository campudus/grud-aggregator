import fs from "fs-extra";
import errors from "./errorCodes";

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

// TODO: check if bug
process.on("error" as any, (error: any) => {
  if (error.message === "channel closed") {
    // handled.
    console.log("Channel closed in forked aggregator.", error);
  } else {
    throw error;
  }
});

function mkDirs(dataDirectory) {
  return new Promise<void>((resolve, reject) => {
    if (dataDirectory) {
      fs.mkdirp(`${dataDirectory}/attachments`, (err) => {
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
  let allSteps = 1;
  let lastStep = 0;

  try {
    import(aggregatorFile)
      .then((aggregator) => aggregator(step, progress, options))
      .then((result) => {
        process.send({
          action: "DONE",
          payload: {
            error: false,
            message: "Done.",
            currentStep: allSteps,
            steps: allSteps,
          },
          data: result,
        });
      })
      .catch((err) => {
        console.error("Error during aggregation", err);
        process.exit(3);
      });

    process.send({
      action: "INIT",
      payload: {
        stepsInAggregator: allSteps,
      },
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

    return (data) => {
      lastStep = lastStep + 1;
      process.send({
        action: "PROGRESS",
        payload: {
          message: message,
          currentStep: lastStep,
          steps: allSteps,
        },
      });
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
        steps: allSteps,
      },
    });
  }
}
