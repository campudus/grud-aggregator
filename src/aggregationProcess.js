import _ from "lodash";
import cp from "child_process";

export function start(
  {
    aggregatorFile,
    progress,
    timeoutToResendStatus = 2000,
    abort: { signal, abortGracePeriod = 1000 } = {},
    ...rest
  } = {}) {

  if (_.isNil(aggregatorFile) || _.isEmpty(aggregatorFile)) {
    throw new Error("Need to supply the filename of the aggregator");
  }

  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error("Expects function for optional `progress` parameter");
  }

  if (!_.isNil(signal) && (
    typeof signal.addEventListener !== "function"
    || typeof signal.removeEventListener !== "function"
    || typeof signal.aborted !== "boolean"
  )) {
    throw new Error("Expects AbortSignal for optional `abort.signal` parameter");
  }

  if (!_.isFinite(abortGracePeriod) || abortGracePeriod < 0) {
    throw new Error("Expects non-negative number for optional `abort.abortGracePeriod` parameter");
  }

  // prevent esm/cjs mismatch
  // esm has to fork esm and cjs has to fork cjs
  const extension = import.meta.filename.endsWith(".cjs") ? ".cjs" : ".js";

  return Promise
    .resolve()
    .then(() => new Promise((resolve, reject) => {
      if (signal && signal.aborted) {
        reject(signal.reason ?? new Error("Aggregator aborted"));
        return;
      }

      const child = cp.fork(`${import.meta.dirname}/forker${extension}`, {silent: false});

      let initialized = false;
      let fulfilled = false;
      let allDone = false;
      let doneReceived = false;
      let aborted = false;
      let abortReason;
      let allSteps = 0;
      let resendProgressTimerId = null;
      let abortKillTimerId = null;
      let result;

      const clearResendProgressTimer = () => {
        if (resendProgressTimerId !== null) {
          clearTimeout(resendProgressTimerId);
          resendProgressTimerId = null;
        }
      };

      const clearAbortKillTimer = () => {
        if (abortKillTimerId !== null) {
          clearTimeout(abortKillTimerId);
          abortKillTimerId = null;
        }
      };

      const onAbort = () => {
        if (fulfilled || doneReceived) {
          return;
        }

        aborted = true;
        abortReason = signal.reason ?? new Error("Aggregator aborted");

        clearResendProgressTimer();
        child.kill("SIGTERM");

        abortKillTimerId = setTimeout(() => {
          if (!fulfilled) {
            child.kill("SIGKILL");
          }
        }, abortGracePeriod);
      };

      if (signal) {
        signal.addEventListener("abort", onAbort, { once: true });
      }

      const removeAbortListener = () => {
        if (signal) {
          signal.removeEventListener("abort", onAbort);
        }
      };

      child.on("message", ({ action, payload, data }) => {
        if (action === "INIT") {
          initialized = true;
          allSteps = payload.stepsInAggregator;
          sendProgress({
            message: `Starting aggregator ${aggregatorFile}`,
            currentStep: 0,
            steps: allSteps
          });
        } else if (action === "PROGRESS") {
          sendProgress(payload);
        } else if (action === "DONE") {
          doneReceived = true;
          removeAbortListener();
          allDone = true;
          result = data;
          sendProgress(payload);
          clearResendProgressTimer();
          child.kill();
        }
      });

      child.on("close", fulfill);

      child.on("error", err => {
        if (!fulfilled) {
          fulfilled = true;
          clearResendProgressTimer();
          clearAbortKillTimer();
          removeAbortListener();
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

      function sendProgress(payload) {
        clearResendProgressTimer();
        if (progress) {
          progress(payload);
        }
        if (aborted || fulfilled) {
          return;
        }
        resendProgressTimerId = setTimeout(() => {
          sendProgress(payload);
        }, timeoutToResendStatus);
      }

      function fulfill(code, exitSignal) {
        clearResendProgressTimer();
        clearAbortKillTimer();
        if (!fulfilled) {
          fulfilled = true;
          removeAbortListener();

          if (aborted) {
            reject(abortReason);
          } else if (allDone) {
            resolve({ result });
          } else if (!initialized) {
            reject(
              new Error(`Could not start up aggregator ${aggregatorFile}. Correct path? Uncaught exception in init?`)
            );
          } else if (exitSignal !== null) {
            reject(new Error(`Aggregator got killed with signal ${exitSignal}`));
          } else if (code !== 0) {
            reject(new Error(`Aggregator broke, possible uncaught exception. Exit code ${code}`));
          } else {
            resolve({ result, code, signal: exitSignal });
          }
        }
      }

    }));

}
