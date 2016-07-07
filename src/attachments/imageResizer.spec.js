import fs from 'fs';
import { reduceImage, generateThumb } from './imageResizer';
import tmp from 'tmp';
import expect from 'must';

const fixtureFile = `${__dirname}/__tests__/duck.png`;
const thumbFile = `${__dirname}/__tests__/duck_thumb.png`;
const wrongImageFile = `${__dirname}/__tests__/wrong-image.png`;
const nonExistantFile = `${__dirname}/__tests__/non-existant.png`;

describe('reduceImage', () => {

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

  it('results in error, if file does not exist', () => {
    const tempFile = tmp.fileSync();
    return expect(reduceImage({fromPath : nonExistantFile, toPath : tempFile.name})).to.reject.with.error(/enoent/i);
  });

  it('results in error, if file is not an image', () => {
    const tempFile = tmp.fileSync();
    return expect(reduceImage({
      fromPath : __filename,
      toPath : tempFile.name
    })).to.reject.with.error(/unsupported mime/i);
  });

  it('results in error, if file is an incorrect image', () => {
    const tempFile = tmp.fileSync();
    return expect(reduceImage({
      fromPath : wrongImageFile,
      toPath : tempFile.name
    })).to.reject.with.error(/unsupported mime/i);
  });

  it('results in error, if it cannot save into directory', function () {
    this.timeout(30 * 1000);

    return expect(reduceImage({
      fromPath : fixtureFile,
      toPath : `${__dirname}/__tests__/non/writable/path/file.txt`
    })).to.reject.with.error(/eacces/i);
  });

});

describe('generateThumb', () => {

  it('results in a smaller file', function () {
    this.timeout(30 * 1000);

    const tempFile = tmp.fileSync();

    return generateThumb({fromPath : fixtureFile, toPath : tempFile.name, imageWidth : 500})
      .then(() => Promise.all([statOf(fixtureFile), statOf(tempFile.name), statOf(thumbFile)]))
      .then(([fixture, output, thumb]) => {
        expect(output.size).to.be.lt(fixture.size);
        expect(output.size).to.be(thumb.size);
      });

  });

  it('can minify a thumbnail even further', function () {
    this.timeout(30 * 1000);

    const tempFile = tmp.fileSync();

    return generateThumb({fromPath : fixtureFile, toPath : tempFile.name, imageWidth : 500, minify : true})
      .then(() => Promise.all([statOf(fixtureFile), statOf(tempFile.name), statOf(thumbFile)]))
      .then(([fixture, output, thumb]) => {
        expect(output.size).to.be.lt(fixture.size);
        expect(output.size).to.be.lt(thumb.size);
      });

  });

  it('can make different sizes from an image', function () {
    this.timeout(30 * 1000);

    const tempFile1 = tmp.fileSync();
    const tempFile2 = tmp.fileSync();
    const tempFile3 = tmp.fileSync();

    return Promise.all([
      statOf(fixtureFile),
      statOf(thumbFile),
      generateThumb({
        fromPath : fixtureFile,
        toPath : tempFile1.name,
        imageWidth : 750
      }).then(() => statOf(tempFile1.name)),
      generateThumb({
        fromPath : fixtureFile,
        toPath : tempFile2.name,
        imageWidth : 500
      }).then(() => statOf(tempFile2.name)),
      generateThumb({
        fromPath : fixtureFile,
        toPath : tempFile3.name,
        imageWidth : 20
      }).then(() => statOf(tempFile3.name))
    ]).then(([fixture, thumb, thumb750, thumb500, thumb20]) => {
      expect(thumb750.size).to.be.lt(fixture.size);
      expect(thumb500.size).to.be.lt(thumb750.size);
      expect(thumb500.size).to.be(thumb.size);
      expect(thumb20.size).to.be.lt(thumb500.size);
    });

  });

  it('results in error, if file is not an image', () => {
    const tempFile = tmp.fileSync();
    return generateThumb({fromPath : __filename, toPath : tempFile.name, imageWidth : 20})
      .catch(err => {
        expect(err).not.to.be.null();
      });
  });

  it('results in error, if file does not exist', () => {
    const tempFile = tmp.fileSync();
    return expect(generateThumb({
      fromPath : nonExistantFile,
      toPath : tempFile.name,
      imageWidth : 20
    })).to.reject.with.error(/enoent/i);
  });

  it('results in error, if file is not an image', () => {
    const tempFile = tmp.fileSync();
    return expect(generateThumb({
      fromPath : __filename,
      toPath : tempFile.name,
      imageWidth : 20
    })).to.reject.with.error(/unsupported mime/i);
  });

  it('results in error, if file is an incorrect image', () => {
    const tempFile = tmp.fileSync();
    return expect(generateThumb({
      fromPath : wrongImageFile,
      toPath : tempFile.name,
      imageWidth : 20
    })).to.reject.with.error(/unsupported mime/i);
  });

  it('results in error, if fed a wrong image size', () => {
    const tempFile = tmp.fileSync();
    return expect(generateThumb({
      fromPath : fixtureFile,
      toPath : tempFile.name,
      imageWidth : 0
    })).to.reject.with.error(/invalid settings/i);
  });

  it('results in error, if it cannot save into directory', () => {
    return expect(generateThumb({
      fromPath : fixtureFile,
      toPath : `${__dirname}/__tests__/non/writable/path/file.txt`,
      imageWidth : 500
    })).to.reject.with.error(/eacces/i);
  });

});

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
