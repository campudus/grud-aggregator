import cp from "child_process";
import expect from "must";
import {start} from "./aggregationProcess";

describe("aggregation-process", function () {

  this.timeout(5000);

  const aggregatorBreaking = `${__dirname}/__tests__/aggregatorBreaking.js`;
  const aggregatorDummy = `${__dirname}/__tests__/aggregatorDummy.js`;
  const aggregatorFile = `${__dirname}/__tests__/aggregatorWorking.js`;
  const aggregatorFileSubsteps = `${__dirname}/__tests__/aggregatorSubsteps.js`;
  const aggregatorFileSubsteps2 = `${__dirname}/__tests__/aggregatorSubsteps2.js`;
  const aggregatorLongRunning = `${__dirname}/__tests__/aggregatorLongRunning.js`;
  const aggregatorLongRunningMultipleWaits = `${__dirname}/__tests__/aggregatorLongRunningMultipleWaits.js`;
  const aggregatorNonExistent = "non-existant-file.js";

  it("needs a filename to the aggregator process script", () => {
    expect(start).to.throw(/Need to supply the filename of the aggregator/i);
  });

  it("does not need a progress function to work", () => {
    return start({
      aggregatorFile: aggregatorDummy
    });
  });

  it("returns a promise", () => {
    expect(start({
      aggregatorFile: aggregatorDummy
    }).then).to.be.a.function();
  });

  it("may get a progress function to show progress", () => {
    let called = false;

    return start({
      aggregatorFile,
      progress: () => {
        called = true;
      }
    })
      .then(() => {
        expect(called).to.be.true();
      });
  });

  it("shows the correct amount steps and the currentStep", () => {
    const messages = ["Starting aggregator", "step A", "step B", "step C", "step D", "Done"];
    let lastStep = -1;
    const numberOfSteps = messages.length - 1;

    return start({
      aggregatorFile: aggregatorDummy,
      progress: ({message, currentStep, steps}) => {
        expect(message).to.startWith(messages[currentStep]);
        expect(lastStep).to.be.lt(currentStep);
        lastStep = currentStep;
        expect(currentStep).to.be.at.most(steps);
        expect(steps).to.be(numberOfSteps);
      }
    }).then(() => {
      expect(lastStep).to.be(numberOfSteps);
    });
  });

  it("should result in an error if the aggregator to fork is not found", () => {
    return start({
      aggregatorFile: aggregatorNonExistent
    }).then(result => {
      // should not occur!
      expect(result).to.be.null();
      expect(true).to.be.false();
    }).catch(err => {
      expect(err).to.be.an.error(new RegExp(`could not start.*${aggregatorNonExistent}`, "i"));
    });
  });

  it("can use the step function in sub-steps", () => {
    const messages = ["one", "two", "three", "four", "five", "six", "seven"];
    const lastProgress = {
      currentStep: -1,
      steps: 8
    };
    return start({
      aggregatorFile: aggregatorFileSubsteps,
      progress: ({message, currentStep, steps}) => {
        if (currentStep > 0 && currentStep <= messages.length) {
          expect(message).to.be(messages[currentStep - 1]);
        }
        expect(currentStep).to.eql(lastProgress.currentStep + 1);
        expect(currentStep).to.be.lte(lastProgress.steps);
        expect(steps).to.be(lastProgress.steps);
        lastProgress.steps = steps;
        lastProgress.currentStep = currentStep;
        lastProgress.message = message;
      }
    }).then(() => {
      expect(lastProgress.message);
      expect(lastProgress.currentStep).to.be(lastProgress.steps);
    });
  });

  it("will not die when child process exits", function () {
    this.timeout(5000);

    return new Promise((resolve, reject) => {
      const myPid = process.pid;
      const child = cp.fork(`${__dirname}/__tests__/killableForker.js`);

      child.on("message", (message) => {
        if (message === "INIT") {
          child.send(myPid);
        }
      });

      process.once("SIGHUP", () => {
        resolve();
      });
    });
  });

  it("will not resend latest progress if it was always quick enough", function () {
    this.timeout(6000);

    const allSteps = 7;
    const countedSteps = [];

    return start({
      aggregatorFile: aggregatorLongRunningMultipleWaits,
      progress: ({message, currentStep, steps}) => {
        expect(steps).to.be(allSteps);
        countedSteps.push(currentStep);
      },
      timeoutToResendStatus: 50,
      howLong: 20
    }).then(() => {
      expect(countedSteps).to.eql([0, 1, 2, 3, 4, 5, 6, 7]);
    });
  });

  it("will send latest progress status if there is no new progress sent by the aggregator", function () {
    this.timeout(6000);

    const allSteps = 4;
    const countedSteps = [];

    return start({
      aggregatorFile: aggregatorLongRunning,
      progress: ({message, currentStep, steps}) => {
        expect(steps).to.be(allSteps);
        countedSteps.push(currentStep);
        if (currentStep === 1) {
          expect(message).to.be("started");
        } else if (currentStep === 2) {
          expect(message).to.be("waiting");
        } else if (currentStep === 3) {
          expect(message).to.be("second");
        }
      },
      howLong: 2500
    }).then(() => {
      expect(countedSteps).to.eql([0, 1, 2, 2, 3, 4]);
    });
  });

  it("can change the timeout to resend latest progress with an option", function () {
    this.timeout(5000);

    const allSteps = 4;
    const countedSteps = [];

    return start({
      aggregatorFile: aggregatorLongRunning,
      progress: ({message, currentStep, steps}) => {
        expect(steps).to.be(allSteps);
        countedSteps.push(currentStep);
        if (currentStep === 1) {
          expect(message).to.be("started");
        } else if (currentStep === 2) {
          expect(message).to.be("waiting");
        } else if (currentStep === 3) {
          expect(message).to.be("second");
        }
      },
      timeoutToResendStatus: 100,
      howLong: 150
    }).then(() => {
      expect(countedSteps).to.eql([0, 1, 2, 2, 3, 4]);
    });
  });

  it("will not continue writing process if it breaks", function () {
    this.timeout(5000);

    const seenMessage = {};
    let brokeDown = false;

    return new Promise((resolve, reject) => {
      start({
        aggregatorFile: aggregatorBreaking,
        progress: ({message, currentStep, steps}) => {
          const step = `${currentStep}/${steps}`;
          if (brokeDown && seenMessage[message] && seenMessage[message] === step) {
            reject("saw a message multiple times");
          }
          seenMessage[message] = step;
        },
        timeoutToResendStatus: 100,
        howLong: 150
      })
        .catch(err => {
          expect(err).to.error(/aggregator broke/i);
          brokeDown = true;
        })
        .then(() => setTimeout(resolve, 500));
    });
  });

  // TODO maybe extend and overwrite function prototype for this...? :)
  it.skip("can use the step function in sub-steps with an easier way to type", () => {
    const messages = ["one", "two", "three", "four", "five", "six", "seven"];
    const lastProgress = {
      currentStep: -1,
      steps: 8
    };
    return start({
      aggregatorFile: aggregatorFileSubsteps2,
      progress: ({message, currentStep, steps}) => {
        if (currentStep > 0 && currentStep <= messages.length) {
          expect(message).to.be(messages[currentStep - 1]);
        }
        expect(currentStep).to.eql(lastProgress.currentStep + 1);
        expect(currentStep).to.be.lte(lastProgress.steps);
        expect(steps).to.be(lastProgress.steps);
        lastProgress.steps = steps;
        lastProgress.currentStep = currentStep;
        lastProgress.message = message;
      }
    }).then(() => {
      expect(lastProgress.message);
      expect(lastProgress.currentStep).to.be(lastProgress.steps);
    });
  });

});
