import path from 'path';
import expect from 'must';
import fs from 'fs-extra';
import tmp from 'tmp';
import {Database} from './database';
import {modifyImages} from './modifyImage';
import {cleanUpWhenDone, statOf} from './__tests__/fsHelpers';

describe('image modification', () => {

  const fixtureFile = `${__dirname}/__tests__/duck.png`;
  const fixtureFile2 = `${__dirname}/__tests__/duck2.png`;
  const fixtureFile3 = `${__dirname}/__tests__/duck3.png`;
  const thumbFile = `${__dirname}/__tests__/duck_thumb.png`;
  const tinyFile = `${__dirname}/__tests__/duck_tiny.png`;
  const scaleResizeFile = `${__dirname}/__tests__/duck_500x400.png`;

  const dbFixturePath = `${__dirname}/__tests__/test-db.json`;
  const dbFixture = new Database(dbFixturePath);

  it('returns a function to be able to pass it into promise chain', () => {
    expect(modifyImages({database : dbFixture, key : 'test'})).to.be.a.function();
  });

  it('expects a key option to be able to save images', () => {
    expect(() => modifyImages({database : dbFixture})).to.throw(/missing key/i);
    expect(() => modifyImages({database : dbFixture, key : null})).to.throw(/missing key/i);
  });

  it('expects a key option to be able to save images', () => {
    expect(() => modifyImages({key : 'test'})).to.throw(/missing database/i);
    expect(() => modifyImages({key : 'test', database : null})).to.throw(/missing database/i);
  });

  it('expects an array of images to modify', () => {
    expect(() => modifyImages({database : dbFixture, key : 'test'})({})).to.throw(/expected array/i);
  });

  it('will not complain if no elements were given', () => {
    expect(() => modifyImages({database : dbFixture, key : 'test'})([])).not.to.throw();
  });

  it('can use the outPath option to save a file somewhere', function () {
    this.timeout(30 * 1000);
    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
      }));
  });

  it('can reduce the image size of a non-minified image', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      minify : true
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
        return Promise.all([statOf(fixtureFile), statOf(results[0])]);
      })
      .then(([fixture, minified]) => {
        expect(minified.size).to.be.lt(fixture.size);
      }));
  });

  it('can resize an image by width only', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageWidth : 500
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
        return Promise.all([statOf(thumbFile), statOf(results[0])]);
      })
      .then(([thumb, minified]) => {
        expect(minified.size).to.be(thumb.size);
      }));
  });

  it('can resize an image by height only', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageHeight : 463
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
        return Promise.all([statOf(thumbFile), statOf(results[0])]);
      })
      .then(([thumb, minified]) => {
        expect(minified.size).to.be(thumb.size);
      }));
  });

  it('can resize an image by width and height and fills with transparency', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageWidth : 500,
      imageHeight : 400
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
        return Promise.all([statOf(scaleResizeFile), statOf(results[0])]);
      })
      .then(([scaledResize, minified]) => {
        expect(minified.size).to.be(scaledResize.size);
      }));
  });

  it('can resize and minify an image in one step', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageWidth : 500,
      minify : true
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
        return Promise.all([statOf(thumbFile), statOf(results[0])]);
      })
      .then(([thumb, minified]) => {
        expect(minified.size).to.be.lt(thumb.size);
      }));
  });

  it('can get progress status during the steps', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);
    let counter = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageWidth : 10,
      minify : true,
      progress : ({message, currentStep, steps}) => {
        counter++;
        expect(steps).to.be(3);
        if (counter === 1) { // "init" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(0);
        } else if (counter === 2) {
          expect(message).to.contain(path.basename(fixtureFile));
          expect(currentStep).to.be(0);
        } else if (counter === 3) {
          expect(message).to.contain(path.basename(fixtureFile2));
          expect(currentStep).to.be(1);
        } else if (counter === 4) {
          expect(message).to.contain(path.basename(fixtureFile3));
          expect(currentStep).to.be(2);
        } else if (counter === 5) { // "done" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(3);
        }
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(() => {
        expect(counter).to.be(5);
      }));
  });

  it('will write information into a lowdb', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageWidth : 10
    })([fixtureFile])
      .then(results => {
        expect(results.length).to.be(1);
        expect(database.find(path.basename(results[0]), 'test')).to.be.true();
        return statOf(databasePath);
      })
      .then(dbStat => {
        expect(dbStat.size).to.be.gt(0);
      }));
  });

  it('will use information from lowdb to skip files', () => {
    // no timeout here, as it should finish very quickly
    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/attachments.json`;
    fs.copySync(dbFixturePath, databasePath);
    const database = new Database(databasePath);

    return cleanUpWhenDone(tmpDir)(
      Promise.resolve([fixtureFile, thumbFile])
        .then(files => {
          expect(database.find(path.basename(files[0]), 'test')).to.be.true();
          expect(database.find(path.basename(files[1]), 'test')).to.be.true();
          return files;
        })
        .then(modifyImages({
          database,
          imageWidth : 1000,
          key : 'test',
          minify : true,
          outPath
        }))
        .then(results => {
          expect(results.length).to.be(2);
          expect(database.find(path.basename(results[0]), 'test')).to.be.true();
          expect(database.find(path.basename(results[1]), 'test')).to.be.true();
        })
    );
  });

  it('can modify multiple images at once', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);
    let steps = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      chunkSize : 3,
      imageWidth : 10,
      progress : () => {
        steps++;
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(results => {
        expect(results.length).to.be(3);
        expect(database.find(path.basename(results[0]), 'test')).to.be.true();
        return Promise.all([
          statOf(`${outPath}/${path.basename(fixtureFile)}`),
          statOf(`${outPath}/${path.basename(fixtureFile2)}`),
          statOf(`${outPath}/${path.basename(fixtureFile3)}`),
          statOf(tinyFile)
        ]);
      })
      .then(([resultFile1, resultFile2, resultFile3, tinyFileStat]) => {
        expect(resultFile1.size).to.be(tinyFileStat.size);
        expect(resultFile2.size).to.be(tinyFileStat.size);
        expect(resultFile3.size).to.be(tinyFileStat.size);
        expect(steps).to.be(3); // start, a single step and done
      }));
  });

  it('can minify and resize images at once', function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);
    let steps = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key : 'test',
      outPath,
      imageWidth : 10,
      minify : true,
      progress : () => {
        steps++;
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(results => {
        expect(results.length).to.be(3);
        expect(database.find(path.basename(results[0]), 'test')).to.be.true();
        expect(database.find(path.basename(results[1]), 'test')).to.be.true();
        expect(database.find(path.basename(results[2]), 'test')).to.be.true();
        return Promise.all([
          statOf(`${outPath}/${path.basename(fixtureFile)}`),
          statOf(`${outPath}/${path.basename(fixtureFile2)}`),
          statOf(`${outPath}/${path.basename(fixtureFile3)}`),
          statOf(tinyFile)
        ]);
      })
      .then(([resultFile1, resultFile2, resultFile3, tinyFileStat]) => {
        expect(resultFile1.size).to.be(tinyFileStat.size);
        expect(resultFile2.size).to.be(tinyFileStat.size);
        expect(resultFile3.size).to.be(tinyFileStat.size);
        expect(steps).to.be(5); // start, three steps and done
      }));
  });

});
