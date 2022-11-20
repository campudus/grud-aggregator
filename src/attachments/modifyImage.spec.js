import path from "path";
import expect from "must";
import fs from "fs-extra";
import tmp from "tmp";
import {Database} from "./database";
import {modifyImages} from "./modifyImage";
import {cleanUpWhenDone, statOf} from "./__tests__/fsHelpers";

describe("image modification", () => {

  const fixtureFile = `${__dirname}/__tests__/duck.png`;
  const fixtureFile2 = `${__dirname}/__tests__/duck2.png`;
  const fixtureFile3 = `${__dirname}/__tests__/duck3.png`;
  const fixtureWithExifFile = `${__dirname}/__tests__/exif_test.jpg`;
  const thumbFile = `${__dirname}/__tests__/duck_thumb.png`;
  const thumbFileByHeight = `${__dirname}/__tests__/duck_thumb_height.png`;
  const tinyFile = `${__dirname}/__tests__/duck_tiny.png`;
  const tinyFileMinified = `${__dirname}/__tests__/duck_tiny_minified.png`;
  const scaleResizeFile = `${__dirname}/__tests__/duck_500x400.png`;
  const wrongImageFile1 = `${__dirname}/__tests__/wrong-image.png`;
  const wrongImageFile2 = `${__dirname}/__tests__/wrong-image.jpg`;
  const fixtureTrimmingFile = `${__dirname}/__tests__/duck_trim.png`;
  const trimmedFile = `${__dirname}/__tests__/duck_trimmed.png`;
  const trimmedAndMinifiedFile = `${__dirname}/__tests__/duck_trimmed_minified.png`;
  const trimmedAndResizedFile = `${__dirname}/__tests__/duck_trimmed_resized.png`;
  const trimmedAndResizedAndMinifiedFile = `${__dirname}/__tests__/duck_trimmed_resized_minified.png`;

  const dbFixturePath = `${__dirname}/__tests__/test-db.json`;
  const dbFixture = new Database(dbFixturePath);

  it("returns a function to be able to pass it into promise chain", () => {
    expect(modifyImages({
      database: dbFixture,
      key: "test"
    })).to.be.a.function();
  });

  it("expects a key option to be able to save images", () => {
    expect(() => modifyImages({database: dbFixture})).to.throw(/missing key/i);
    expect(() => modifyImages({
      database: dbFixture,
      key: null
    })).to.throw(/missing key/i);
  });

  it("expects a key option to be able to save images", () => {
    expect(() => modifyImages({key: "test"})).to.throw(/missing database/i);
    expect(() => modifyImages({
      key: "test",
      database: null
    })).to.throw(/missing database/i);
  });

  it("expects an array of images to modify", () => {
    expect(() => modifyImages({
      database: dbFixture,
      key: "test"
    })({})).to.throw(/expected array/i);
  });

  it("will not complain if no elements were given", () => {
    expect(() => modifyImages({
      database: dbFixture,
      key: "test"
    })([])).not.to.throw();
  });

  it("can strip out EXIF data", function () {
    this.timeout(30 * 1000);
    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      minify: true,
      resize: 50,
      outPath
    })([fixtureWithExifFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/exif_test.jpg`);
      }));
  });

  it("can use the outPath option to save a file somewhere", function () {
    this.timeout(30 * 1000);
    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
      }));
  });

  it("can reduce the image size of a non-minified image", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      minify: true
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

  it("can resize an image by width only", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 500
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

  it("can resize an image by height only", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageHeight: 463
    })([fixtureFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck.png`);
        return Promise.all([statOf(thumbFileByHeight), statOf(results[0])]);
      })
      .then(([thumb, minified]) => {
        expect(minified.size).to.be(thumb.size);
      }));
  });

  it("can resize an image by width and height and fills with transparency", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 500,
      imageHeight: 400
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

  it("can resize and minify an image in one step", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 500,
      minify: true
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

  it("can resize and trim an image in one step", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 500,
      trim: true
    })([fixtureTrimmingFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck_trim.png`);
        return Promise.all([statOf(trimmedAndResizedFile), statOf(results[0])]);
      })
      .then(([fixture, minified]) => {
        expect(minified.size).to.be(fixture.size);
      }));
  });

  it("can minify and trim an image in one step", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      minify: true,
      trim: true
    })([fixtureTrimmingFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck_trim.png`);
        return Promise.all([statOf(trimmedAndMinifiedFile), statOf(results[0])]);
      })
      .then(([fixture, minified]) => {
        expect(minified.size).to.be(fixture.size);
      }));
  });

  it("can resize and minify and trim an image in one step", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 500,
      minify: true,
      trim: true
    })([fixtureTrimmingFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck_trim.png`);
        return Promise.all([statOf(trimmedAndResizedAndMinifiedFile), statOf(results[0])]);
      })
      .then(([fixture, minified]) => {
        expect(minified.size).to.be(fixture.size);
      }));
  });

  it("can only trim an image", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      trim: true
    })([fixtureTrimmingFile])
      .then(results => {
        expect(results).to.be.an.array();
        expect(results[0]).to.be(`${outPath}/duck_trim.png`);
        return Promise.all([statOf(trimmedFile), statOf(results[0])]);
      })
      .then(([fixture, trimmed]) => {
        expect(trimmed.size).to.be(fixture.size);
      }));
  });

  it("can get progress status during the steps", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);
    let counter = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 10,
      minify: true,
      progress: ({message, currentStep, steps}) => {
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

  it("will print the correct progress status during the steps with a chunkSize set", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);
    let counter = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 10,
      chunkSize: 2,
      minify: true,
      progress: ({message, currentStep, steps}) => {
        counter++;
        expect(steps).to.be(3);
        if (counter === 1) { // "init" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(0);
        } else if (counter === 2) {
          expect(message).to.contain(path.basename(fixtureFile));
          expect(message).to.contain(path.basename(fixtureFile2));
          expect(message).not.to.contain(path.basename(fixtureFile3));
          expect(currentStep).to.be(0);
        } else if (counter === 3) {
          expect(message).not.to.contain(path.basename(fixtureFile));
          expect(message).not.to.contain(path.basename(fixtureFile2));
          expect(message).to.contain(path.basename(fixtureFile3));
          expect(currentStep).to.be(2);
        } else if (counter === 4) { // "done" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(3);
        }
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(() => {
        expect(counter).to.be(4);
      }));
  });

  it("will print the progress status when trying to modify the same image again", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);
    const images = [fixtureFile, fixtureFile2, fixtureFile];
    const [image1, image2, image3] = images;

    let counter = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 10,
      minify: true,
      progress: ({message, currentStep, steps}) => {
        counter++;

        expect(steps).to.be(3);

        if (counter === 1) {
          // "init" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(0);
        } else if (counter === 2) {
          // try modifying image1
          expect(message).to.contain(path.basename(image1));
          expect(currentStep).to.be(0);
        } else if (counter === 3) {
          // try modifying image2
          expect(message).to.contain(path.basename(image2));
          expect(currentStep).to.be(1);
        } else if (counter === 4) {
          // try modifying image3 (== image1)
          expect(message).to.contain(path.basename(image3));
          expect(currentStep).to.be(2);
        } else if (counter === 5) {
          // "already modified" message for image3
          expect(message).to.contain(path.basename(image1));
          expect(currentStep).to.be(2);
        } else if (counter === 6) {
          // "done" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(3);
        }
      }
    })(images)
      .then(modifiedFiles => {
        expect(counter).to.be(6);
        expect(modifiedFiles).to.have.length(3);
      }));
  });

  it("will properly process images in chunks even with erroneous images", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/database.json`);
    const images = [fixtureFile, wrongImageFile1, wrongImageFile2, fixtureFile2];
    const [image1, image2, image3, image4] = images;

    let onErrorCalledCounter = 0;
    let counter = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 10,
      minify: true,
      chunkSize: 2,
      onError: (error, filePath) => {
        onErrorCalledCounter++;

        const expectedWrongImage = onErrorCalledCounter === 1 ? image2 : image3;

        expect(error).to.be.error();
        expect(filePath).to.contain(path.basename(expectedWrongImage));
      },
      progress: ({error, message, currentStep, steps}) => {
        counter++;

        expect(steps).to.be(4);

        if (counter === 1) {
          // "init" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(0);
        } else if (counter === 2) {
          // try modifying image1 and image 2
          expect(message).to.contain(path.basename(image1));
          expect(message).to.contain(path.basename(image2));
          expect(currentStep).to.be(0);
        } else if (counter === 3) {
          // error message for image2
          expect(message).to.contain(path.basename(image2));
          expect(error).not.to.be(false);
          expect(currentStep).to.be(0);
        } else if (counter === 4) {
          // try modifying image3 and image4
          expect(message).to.contain(path.basename(image3));
          expect(message).to.contain(path.basename(image4));
          expect(currentStep).to.be(2);
        } else if (counter === 5) {
          // error message for image3
          expect(message).to.contain(path.basename(image3));
          expect(error).not.to.be(false);
          expect(currentStep).to.be(2);
        } else if (counter === 6) {
          // "done" message
          expect(message).not.to.be.empty();
          expect(currentStep).to.be(4);
        }
      }
    })(images)
      .then(modifiedFiles => {
        expect(counter).to.be(6);
        expect(onErrorCalledCounter).to.be(2);
        expect(modifiedFiles).to.have.length(2);
      }));
  });

  it("will write information into a lowdb", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 10
    })([fixtureFile])
      .then(results => {
        expect(results.length).to.be(1);
        expect(database.find(path.basename(results[0]), "test")).to.be.true();
        return statOf(databasePath);
      })
      .then(dbStat => {
        expect(dbStat.size).to.be.gt(0);
      }));
  });

  it("will write information into a lowdb after every chunk", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 200,
      minify: true,
      chunkSize: 2,
      progress: ({currentStep, steps}) => {
        if (currentStep > 0 && currentStep < steps) {
          expect(database.find(path.basename(fixtureFile), "test")).to.be.true();
          expect(database.find(path.basename(fixtureFile2), "test")).to.be.true();
          expect(database.find(path.basename(fixtureFile3), "test")).to.be.falsy();
        }
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(results => {
        expect(results.length).to.be(3);
        expect(database.find(path.basename(fixtureFile), "test")).to.be.true();
        expect(database.find(path.basename(fixtureFile2), "test")).to.be.true();
        expect(database.find(path.basename(fixtureFile3), "test")).to.be.true();
        return statOf(databasePath);
      })
      .then(dbStat => {
        expect(dbStat.size).to.be.gt(0);
      }));
  });

  it("will use information from lowdb to skip files", () => {
    // no timeout here, as it should finish very quickly
    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/attachments.json`;
    fs.copySync(dbFixturePath, databasePath);
    const database = new Database(databasePath);

    return cleanUpWhenDone(tmpDir)(
      Promise
        .resolve([fixtureFile, thumbFile])
        .then(files => {
          expect(database.find(path.basename(files[0]), "test")).to.be.true();
          expect(database.find(path.basename(files[1]), "test")).to.be.true();
          return files;
        })
        .then(modifyImages({
          database,
          imageWidth: 1000,
          key: "test",
          minify: true,
          outPath
        }))
        .then(results => {
          expect(results.length).to.be(2);
          expect(database.find(path.basename(results[0]), "test")).to.be.true();
          expect(database.find(path.basename(results[1]), "test")).to.be.true();
        })
    );
  });

  it("can modify multiple images at once", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);
    let steps = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      chunkSize: 3,
      imageWidth: 10,
      progress: () => {
        steps++;
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(results => {
        expect(results.length).to.be(3);
        expect(database.find(path.basename(results[0]), "test")).to.be.true();
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

  it("can minify and resize images at once", function () {
    this.timeout(30 * 1000);

    const tmpDir = tmp.dirSync({unsafeCleanup: true});
    const outPath = tmpDir.name;
    const databasePath = `${outPath}/database.json`;
    const database = new Database(databasePath);
    let steps = 0;

    return cleanUpWhenDone(tmpDir)(modifyImages({
      database,
      key: "test",
      outPath,
      imageWidth: 10,
      minify: true,
      progress: () => {
        steps++;
      }
    })([fixtureFile, fixtureFile2, fixtureFile3])
      .then(results => {
        expect(results.length).to.be(3);
        expect(database.find(path.basename(results[0]), "test")).to.be.true();
        expect(database.find(path.basename(results[1]), "test")).to.be.true();
        expect(database.find(path.basename(results[2]), "test")).to.be.true();
        return Promise.all([
          statOf(`${outPath}/${path.basename(fixtureFile)}`),
          statOf(`${outPath}/${path.basename(fixtureFile2)}`),
          statOf(`${outPath}/${path.basename(fixtureFile3)}`),
          statOf(tinyFileMinified)
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
