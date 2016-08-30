import expect from 'must';
import {start} from './aggregationProcess';

describe('aggregation-process', () => {

  const aggregatorDummy = `${__dirname}/__tests__/aggregatorDummy.js`;
  const aggregatorFile = `${__dirname}/__tests__/aggregatorWorking.js`;
  const aggregatorFileSubsteps = `${__dirname}/__tests__/aggregatorSubsteps.js`;
  const aggregatorFileSubsteps2 = `${__dirname}/__tests__/aggregatorSubsteps2.js`;
  const aggregatorNonExistent = 'non-existant-file.js';

  it('needs a filename to the aggregator process script', () => {
    expect(start).to.throw(/Need to supply the filename of the aggregator/i);
  });

  it('does not need a progress function to work', () => {
    return start({
      aggregatorFile : aggregatorDummy
    });
  });

  it('returns a promise', () => {
    expect(start({
      aggregatorFile : aggregatorDummy
    }).then).to.be.a.function();
  });

  it('may get a progress function to show progress', () => {
    let called = false;

    return start({
      aggregatorFile,
      progress : () => {
        called = true;
      }
    })
      .then(() => {
        expect(called).to.be.true();
      });
  });

  it('shows the correct amount steps and the currentStep', () => {
    const messages = ['Starting aggregator', 'step A', 'step B', 'step C', 'step D', 'Done'];
    let lastStep = -1;
    const numberOfSteps = messages.length - 1;

    return start({
      aggregatorFile : aggregatorDummy,
      progress : ({message, currentStep, steps}) => {
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

  it('should result in an error if the aggregator to fork is not found', () => {
    return start({
      aggregatorFile : aggregatorNonExistent
    }).then(result => {
      // should not occur!
      expect(result).to.be.null();
      expect(true).to.be.false();
    }).catch(err => {
      expect(err).to.be.an.error(new RegExp(`could not start.*${aggregatorNonExistent}`, 'i'));
    });
  });

  it('can use the step function in sub-steps', () => {
    const messages = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const lastProgress = {
      currentStep : -1,
      steps : 8
    };
    return start({
      aggregatorFile : aggregatorFileSubsteps,
      progress : ({message, currentStep, steps}) => {
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

  // TODO maybe extend and overwrite function prototype for this...? :)
  it.skip('can use the step function in sub-steps with an easier way to type', () => {
    const messages = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const lastProgress = {
      currentStep : -1,
      steps : 8
    };
    return start({
      aggregatorFile : aggregatorFileSubsteps2,
      progress : ({message, currentStep, steps}) => {
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
