import fs from "fs";
import tmp from "tmp";
import expect from "must";
import { statOf } from "./__tests__/fsHelpers";
import { reduceImage, generateThumb, trimImage } from "./imageResizer";

const fixtureFile = extension => `${__dirname}/__tests__/duck.${extension}`;
const thumbFile = extension => `${__dirname}/__tests__/duck_thumb.${extension}`;
const scaleResizeFile = extension => `${__dirname}/__tests__/duck_500x400.${extension}`;
const wrongImageFile = extension => `${__dirname}/__tests__/wrong-image.${extension}`;
const nonExistentFile = extension => `${__dirname}/__tests__/non-existent.${extension}`;
const trimmingFile = extension => `${__dirname}/__tests__/duck_trim.${extension}`;
const trimmedFile = extension => `${__dirname}/__tests__/duck_trimmed.${extension}`;
const trimmedAndMinifiedFile = extension => `${__dirname}/__tests__/duck_trimmed_minified.${extension}`;
const trimmedAndResizedFile = extension => `${__dirname}/__tests__/duck_trimmed_resized.${extension}`;
const trimmedAndResizedAndMinifiedFile = extension => `${__dirname}/__tests__/duck_trimmed_resized_minified.${extension}`;

describe("reduceImage", () => {

  it("results in error, if file is not an image", () => {
    const tempFile = tmp.fileSync();
    return expect(reduceImage({
      fromPath: __filename,
      toPath: tempFile.name
    })).to.reject.with.error(/unsupported image format/i);
  });

  it("fixture file has a size (png)", test001("png"));
  it("fixture file has a size (jpg)", test001("jpg"));
  function test001(extension) {
    return () => {
      return statOf(fixtureFile(extension))
        .then(stats => {
          expect(stats.size).to.be.gt(0);
        });
    };
  }

  it("reduces an image of a duck correctly (png)", test002("png"));
  it("reduces an image of a duck correctly (jpg)", test002("jpg"));
  function test002(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tempFile = tmp.fileSync();

      return reduceImage({
        fromPath: fixtureFile(extension),
        toPath: tempFile.name
      })
        .then(() => Promise.all([statOf(fixtureFile(extension)), statOf(tempFile.name)]))
        .then(([statsOld, statsNew]) => {
          expect(statsOld.size).to.be.gt(statsNew.size);
        });
    };
  }

  it("results in error, if file does not exist (png)", test003("png"));
  it("results in error, if file does not exist (jpg)", test003("jpg"));
  function test003(extension) {
    return () => {
      const tempFile = tmp.fileSync();
      return expect(reduceImage({
        fromPath: nonExistentFile(extension),
        toPath: tempFile.name
      })).to.reject.with.error(/Input file is missing/i);
    };
  }

  it("results in error, if file is an incorrect image (png)", test004("png"));
  it("results in error, if file is an incorrect image (jpg)", test004("jpg"));
  function test004(extension) {
    return () => {
      const tempFile = tmp.fileSync();
      return expect(reduceImage({
        fromPath: wrongImageFile(extension),
        toPath: tempFile.name
      })).to.reject.with.error(/unsupported image format/i);
    };
  }

  it("results in error, if it cannot save into directory (png)", test005("png"));
  it("results in error, if it cannot save into directory (jpg)", test005("jpg"));
  function test005(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tmpDir = tmp.dirSync();
      const path = tmpDir.name;
      fs.chmodSync(path, 444);

      return expect(reduceImage({
        fromPath: fixtureFile(extension),
        toPath: `${path}/file.txt`
      }))
        .to.reject.with.error(/Permission denied/i)
        .then(() => tmpDir.removeCallback());
    };
  }

  it("can minify a scaled resized image (png)", test008b("png"));
  it("can minify a scaled resized image (jpg)", test008b("jpg"));
  function test008b(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tempFile = tmp.fileSync();

      return reduceImage({
        fromPath: scaleResizeFile(extension),
        toPath: tempFile.name
      })
        .then(() => Promise.all([
          statOf(fixtureFile(extension)),
          statOf(tempFile.name),
          statOf(scaleResizeFile(extension))
        ]))
        .then(([fixture, output, scaleResize]) => {
          expect(output.size).to.be.lt(fixture.size);
          expect(output.size).to.be.lt(scaleResize.size);
        });

    };
  }

  it("can minify and trim transparent pixels from all edges (png)", test009("png"));
  it("can minify and trim pixels from all edges (jpg)", test009("jpg"));
  function test009(extension) {
    return function () {
      this.timeout(30 * 1000);
      const tempFile = tmp.fileSync();

      return reduceImage({
        fromPath: trimmingFile(extension),
        toPath: tempFile.name,
        trim: true
      })
        .then(() => Promise.all([statOf(trimmedAndMinifiedFile(extension)), statOf(tempFile.name)]))
        .then(([fixture, output]) => {
          expect(output.size).to.be(fixture.size);
        });
    };
  }

});

describe("generateThumb", () => {

  it("results in a smaller file (png)", test006("png"));
  it("results in a smaller file (jpg)", test006("jpg"));
  function test006(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tempFile = tmp.fileSync();

      return generateThumb({
        fromPath: fixtureFile(extension),
        toPath: tempFile.name,
        imageWidth: 500
      })
        .then(() => Promise.all([statOf(fixtureFile(extension)), statOf(tempFile.name), statOf(thumbFile(extension))]))
        .then(([fixture, output, thumb]) => {
          expect(output.size).to.be.lt(fixture.size);
          expect(output.size).to.be(thumb.size);
        });

    };
  }

  it("can resize and trim transparent pixels from all edges (png)", test007a("png"));
  it("can resize and trim pixels from all edges (jpg)", test007a("jpg"));
  function test007a(extension) {
    return function () {
      const tempFile = tmp.fileSync();

      return generateThumb({
        fromPath: trimmingFile(extension),
        toPath: tempFile.name,
        imageWidth: 500,
        trim: true
      })
        .then(() => Promise.all([statOf(trimmedAndResizedFile(extension)), statOf(tempFile.name)]))
        .then(([fixture, output]) => {
          expect(output.size).to.be(fixture.size);
        });
    };
  }

  it("can resize and minify and trim transparent pixels from all edges (png)", test007b("png"));
  it("can resize and minify and trim pixels from all edges (jpg)", test007b("jpg"));
  function test007b(extension) {
    return function () {
      const tempFile = tmp.fileSync();

      return generateThumb({
        fromPath: trimmingFile(extension),
        toPath: tempFile.name,
        imageWidth: 500,
        minify: true,
        trim: true
      })
        .then(() => Promise.all([statOf(trimmedAndResizedAndMinifiedFile(extension)), statOf(tempFile.name)]))
        .then(([fixture, output]) => {
          expect(output.size).to.be(fixture.size);
        });
    };
  }

  it("can minify a thumbnail even further (png)", test007("png"));
  it("can minify a thumbnail even further (jpg)", test007("jpg"));
  function test007(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tempFile = tmp.fileSync();

      return generateThumb({
        fromPath: fixtureFile(extension),
        toPath: tempFile.name,
        imageWidth: 500,
        minify: true
      })
        .then(() => Promise.all([statOf(fixtureFile(extension)), statOf(tempFile.name), statOf(thumbFile(extension))]))
        .then(([fixture, output, thumb]) => {
          expect(output.size).to.be.lt(fixture.size);
          expect(output.size).to.be.lt(thumb.size);
        });

    };
  }

  it("can minify a scaled resized image even further (png)", test008a("png"));
  it("can minify a scaled resized image even further (jpg)", test008a("jpg"));
  function test008a(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tempFile = tmp.fileSync();

      return generateThumb({
        fromPath: fixtureFile(extension),
        toPath: tempFile.name,
        imageWidth: 500,
        imageHeight: 400,
        minify: true
      })
        .then(() => Promise.all([
          statOf(fixtureFile(extension)),
          statOf(tempFile.name),
          statOf(scaleResizeFile(extension))
        ]))
        .then(([fixture, output, scaleResize]) => {
          expect(output.size).to.be.lt(fixture.size);
          expect(output.size).to.be.lt(scaleResize.size);
        });

    };
  }

  it("can make different sizes from an image (png)", test009("png"));
  it("can make different sizes from an image (jpg)", test009("jpg"));
  function test009(extension) {
    return function () {
      this.timeout(30 * 1000);

      const tempFile1 = tmp.fileSync();
      const tempFile2 = tmp.fileSync();
      const tempFile3 = tmp.fileSync();

      return Promise
        .all([
          statOf(fixtureFile(extension)),
          statOf(thumbFile(extension)),
          generateThumb({
            fromPath: fixtureFile(extension),
            toPath: tempFile1.name,
            imageWidth: 750
          }).then(() => statOf(tempFile1.name)),
          generateThumb({
            fromPath: fixtureFile(extension),
            toPath: tempFile2.name,
            imageWidth: 500
          }).then(() => statOf(tempFile2.name)),
          generateThumb({
            fromPath: fixtureFile(extension),
            toPath: tempFile3.name,
            imageWidth: 20
          }).then(() => statOf(tempFile3.name))
        ])
        .then(([fixture, thumb, thumb750, thumb500, thumb20]) => {
          expect(thumb750.size).to.be.lt(fixture.size);
          expect(thumb500.size).to.be.lt(thumb750.size);
          expect(thumb500.size).to.be(thumb.size);
          expect(thumb20.size).to.be.lt(thumb500.size);
        });

    };
  }

  it("results in error, if file is not an image", () => {
    const tempFile = tmp.fileSync();
    return generateThumb({
      fromPath: __filename,
      toPath: tempFile.name,
      imageWidth: 20
    })
      .catch(err => {
        expect(err).not.to.be.null();
      });
  });

  it("results in error, if file does not exist (png)", test011("png"));
  it("results in error, if file does not exist (jpg)", test011("jpg"));
  function test011(extension) {
    return () => {
      const tempFile = tmp.fileSync();
      return expect(generateThumb({
        fromPath: nonExistentFile(extension),
        toPath: tempFile.name,
        imageWidth: 20
      })).to.reject.with.error(/Input file is missing/i);
    };
  }

  it("results in error, if file is not an image and options set", () => {
    const tempFile = tmp.fileSync();
    return expect(generateThumb({
      fromPath: __filename,
      toPath: tempFile.name,
      imageWidth: 20
    })).to.reject.with.error(/unsupported image format/i);
  });

  it("results in error, if file is an incorrect image (png)", test012("png"));
  it("results in error, if file is an incorrect image (jpg)", test012("jpg"));
  function test012(extension) {
    return function () {
      this.timeout(10 * 1000);
      const tempFile = tmp.fileSync();
      return expect(generateThumb({
        fromPath: wrongImageFile(extension),
        toPath: tempFile.name,
        imageWidth: 20
      })).to.reject.with.error(/unsupported image format/i);
    };
  }

  it("results in error, if fed a wrong image size (png)", test013("png"));
  it("results in error, if fed a wrong image size (jpg)", test013("jpg"));
  function test013(extension) {
    return function () {
      this.timeout(10 * 1000);
      const tempFile = tmp.fileSync();
      return expect(generateThumb({
        fromPath: fixtureFile(extension),
        toPath: tempFile.name,
        imageWidth: 0
      })).to.reject.with.error(/Expected positive integer for width but received 0/i);
    };
  }

  it("results in error, if it cannot save into directory (png)", test014("png"));
  it("results in error, if it cannot save into directory (jpg)", test014("jpg"));
  function test014(extension) {
    return function () {
      this.timeout(10 * 1000);

      const tmpDir = tmp.dirSync();
      const path = tmpDir.name;
      fs.chmodSync(path, 444);

      return expect(generateThumb({
        fromPath: fixtureFile(extension),
        toPath: `${path}/file.txt`,
        imageWidth: 500
      }))
        .to.reject.with.error(/Permission denied/i)
        .then(() => {
          console.log(`removing tempdir ${path}`);
          tmpDir.removeCallback();
        });
    };
  }

});

describe("trimImage", () => {
  it("can trim transparent pixels from all edges (png)", test0015("png"));
  it("can trim pixels from all edges (jpg)", test0015("jpg"));
  function test0015(extension) {
    return function () {
      this.timeout(30 * 1000);
      const tempFile = tmp.fileSync();

      return trimImage({
        fromPath: trimmingFile(extension),
        toPath: tempFile.name
      })
        .then(() => Promise.all([statOf(trimmedFile(extension)), statOf(tempFile.name)]))
        .then(([fixture, output]) => {
          expect(output.size).to.be(fixture.size);
        });
    };
  }

});
