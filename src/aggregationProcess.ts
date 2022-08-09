import * as _ from "lodash";
import cp from "child_process";

import { AggregationMessage, AggregationProcess } from "./types/aggregationProcess";

export const start: AggregationProcess = ({
  aggregatorFile,
  progress,
  timeoutToResendStatus = 2000,
  ...rest
} = {}) => {
  if (_.isNil(aggregatorFile) || _.isEmpty(aggregatorFile)) {
    throw new Error("Need to supply the filename of the aggregator");
  }

  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error("Expects function for optional `progress` parameter");
  }

  return Promise.resolve().then(
    () =>
      new Promise((resolve, reject) => {
        const child =
          process.env.NODE_ENV === "test"
            ? cp.fork(`${__dirname}/forker.ts`, [], {
                execArgv: ["-r", "ts-node/register"],
              })
            : cp.fork(`${__dirname}/forker.js`);
        let initialized = false;
        let fulfilled = false;
        let allDone = false;
        let allSteps = 0;
        let resendProgressTimerId = null;
        let result;

        child.on("message", ({ action, payload, data }: AggregationMessage) => {
          if (action === "INIT") {
            initialized = true;
            allSteps = payload.stepsInAggregator;
            sendProgress({
              message: `Starting aggregator ${aggregatorFile}`,
              currentStep: 0,
              steps: allSteps,
            });
          } else if (action === "PROGRESS") {
            sendProgress(payload);
          } else if (action === "DONE") {
            sendProgress(payload);
            if (resendProgressTimerId !== null) {
              clearTimeout(resendProgressTimerId);
              resendProgressTimerId = null;
            }
            allDone = true;
            result = data;
            child.kill();
          }
        });

        child.on("close", fulfill);

        child.on("error", (err) => {
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
            options: rest,
          },
        });

        function sendProgress(payload: any) {
          if (resendProgressTimerId !== null) {
            clearTimeout(resendProgressTimerId);
          }
          if (progress) {
            progress(payload);
          }
          resendProgressTimerId = setTimeout(() => {
            sendProgress(payload);
          }, timeoutToResendStatus);
        }

        function fulfill(code: number, signal: string) {
          if (resendProgressTimerId !== null) {
            clearTimeout(resendProgressTimerId);
          }
          if (!fulfilled) {
            fulfilled = true;
            if (allDone) {
              resolve({ result });
            } else if (!initialized) {
              reject(
                new Error(
                  `Could not start up aggregator ${aggregatorFile}. Correct path? Uncaught exception in init?`
                )
              );
            } else if (signal !== null) {
              reject(new Error(`Aggregator got killed with signal ${signal}`));
            } else if (code !== 0) {
              reject(new Error(`Aggregator broke, possible uncaught exception. Exit code ${code}`));
            } else {
              resolve({ result, code, signal });
            }
          }
        }
      })
  );
};
