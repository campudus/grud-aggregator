import fs from 'fs';
import { reduceImage } from './imageResizer';
import tmp from 'tmp';
import expect from 'must';

describe('reduceImage', () => {
  const fixtureFile = `${__dirname}/__tests__/duck.png`;

  it('fixture file has a size', () => {
    return statOf(fixtureFile)
      .then(stats => {
        expect(stats.size).to.be.gt(0);
      });
  });

  it('reduces an image from a duck correctly', function () {
    this.timeout(30 * 1000);

    const tempFile = tmp.fileSync();

    return reduceImage({fromPath : fixtureFile, toPath : tempFile.name})
      .then(() => Promise.all([statOf(fixtureFile), statOf(tempFile.name)]))
      .then(([statsOld, statsNew]) => {
        expect(statsOld.size).to.be.gt(statsNew.size);
      });
  });

});

function statOf(file) {
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
