import expect from 'must';
import { start } from './aggregationProcess';

describe('aggregation-process', () => {

  const aggregatorDummy = `${__dirname}/__tests__/aggregatorDummy.js`;
  const aggregator = `${__dirname}/__tests__/aggregatorWorking.js`;
  const aggregatorNonExistent = 'non-existant-file.js';

  it('needs a filename to the aggregator process script', () => {
    expect(start).to.throw(/Need to supply the filename of the aggregator/i);
  });

  it('does not need a progress function to work', () => {
    return start({
      aggregator : aggregatorDummy
    });
  });

  it('returns a promise', () => {
    expect(start({
      aggregator : aggregatorDummy
    }).then).to.be.a.function();
  });

  it('may get a progress function to show progress', () => {
    let called = false;

    return start({
      aggregator,
      progress : () => {
        called = true;
      }
    })
      .then(() => {
        expect(called).to.be.true();
      });
  });

  it('shows the correct amount steps and the currentStep', () => {
    const numberOfSteps = 5;
    let lastStep = -1;

    return start({
      aggregator : aggregatorDummy,
      progress : ({message, currentStep, steps}) => {
        console.log('called progress!', message, currentStep, steps);
        expect(message).not.to.be.null();
        if (1 <= currentStep && currentStep <= 4) {
          expect(message).to.be(`step ${String.fromCharCode('A'.charCodeAt(0) + currentStep - 1)}`);
        }
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
      aggregator : aggregatorNonExistent
    }).then(result => {
      // should not occur!
      expect(result).to.be.null();
      expect(true).to.be.false();
    }).catch(err => {
      expect(err).to.be.an.error(new RegExp(`could not start.*${aggregatorNonExistent}`, 'i'));
    });
  });

});
