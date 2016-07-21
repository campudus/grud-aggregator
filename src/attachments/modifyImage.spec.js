import path from 'path';
import expect from 'must';
import fs from 'fs-extra';
import tmp from 'tmp';
import { Database } from './database';
import { modifyImages } from './modifyImage';
import { cleanUpWhenDone, statOf } from './__tests__/fsHelpers';

describe('image modification', () => {

  const fixtureFile = `${__dirname}/__tests__/duck.png`;
  const thumbFile = `${__dirname}/__tests__/duck_thumb.png`;
// const wrongImageFile = `${__dirname}/__tests__/wrong-image.png`;
// const nonExistentFile = `${__dirname}/__tests__/non-existent.png`;

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

  it('can resize an image', function () {
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
      imageWidth : 500,
      minify : true,
      progress : (status, currentStep, steps) => {
        counter++;
        expect(steps).to.be(4);
        if (counter === 1) {
          expect(status).not.to.be.empty();
          expect(currentStep).to.be(0);
        } else if (counter === 2) {
          expect(status).to.contain(path.basename(fixtureFile));
          expect(currentStep).to.be(0);
        } else if (counter === 3) {
          expect(status).to.contain(path.basename(thumbFile));
          expect(currentStep).to.be(1);
        } else if (counter === 4) {
          expect(status).to.contain(path.basename(fixtureFile));
          expect(currentStep).to.be(2);
        } else if (counter === 5) {
          expect(status).to.contain(path.basename(thumbFile));
          expect(currentStep).to.be(3);
        } else if (counter === 6) {
          expect(currentStep).to.be(4);
        }
      }
    })([fixtureFile, thumbFile])
      .then(() => {
        expect(counter).to.be(6);
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

  it('will use information from lowdb to skip files', function () {
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

});
