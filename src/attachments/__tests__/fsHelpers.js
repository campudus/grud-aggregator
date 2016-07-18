import fs from 'fs-extra';
import expect from 'must';

export function cleanUpWhenDone(tmpDir) {
  return promise => promise
    .then(() => {
      tmpDir.removeCallback();
    }, err => {
      tmpDir.removeCallback();
      throw err;
    });
}

export function statOf(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

describe('statOf', () => {

  it('gives correct information', () => {
    return statOf(__filename)
      .then(stats => {
        expect(stats.size).to.be.gt(0);
      });
  });

  it('can result in an error if file not exists', () => {
    return statOf('non-existant')
      .catch(err => {
        expect(err).not.to.be.null();
      });
  });

});
