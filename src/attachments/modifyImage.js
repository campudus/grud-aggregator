import path from "path";
import {fork} from "child_process";
import _ from "lodash";

export function modifyImages(
  {
    chunkSize = 1,
    imageWidth = "auto",
    imageHeight = "auto",
    database,
    key,
    minify = false,
    outPath = "out",
    onError = _.noop,
    progress = () => {
    }
  } = {
    chunkSize: 1,
    imageWidth: "auto",
    imageHeight: "auto",
    minify: false,
    dataDirectory: "out",
    outPath: "out",
    onError: _.noop,
    progress: () => {
    }
  }) {

  if (_.isEmpty(key)) {
    throw new Error("Missing key option");
  }

  if (_.isEmpty(database)) {
    throw new Error("Missing database option");
  }

  return images => {
    if (!_.isArray(images)) {
      throw new Error("Expected Array as images");
    }

    const inputs = _.map(images, image => ({
      fromPath: image,
      toPath: `${outPath}/${path.basename(image)}`
    }));
    const resize = imageWidth !== "auto" || imageHeight !== "auto";
    const steps = inputs.length;

    return Promise
      .resolve({
        currentStep: 0,
        files: inputs
      })
      .then(stepAndFiles => {
        progress({
          error: false,
          message: "Modifying images",
          currentStep: stepAndFiles.currentStep,
          steps
        });

        return stepAndFiles;
      })
      .then(stepAndAllFiles => {
        if (resize || minify) { // resize can resize AND minify at the same time
          const chunkedFiles = _.chunk(stepAndAllFiles.files, chunkSize);

          return _.reduce(chunkedFiles,
            (promise, chunkFiles) => promise
              .then(stepAndFiles => {
                const {currentStep, files: previousFiles} = stepAndFiles;

                const doing = resize && minify ? "Resizing and minifying" : resize ? "Resizing" : "Minifying";
                const multiple = chunkSize > 1;

                progress({
                  error: false,
                  message: `${doing} image${multiple ? "s" : ""} ${_.map(chunkFiles, file => file.fromPath)
                                                                    .join(", ")}`,
                  currentStep,
                  steps
                });

                const filesInChunkWithStatus = _.map(chunkFiles, file => {
                  const {fromPath, toPath} = file;

                  if (database.find(path.basename(toPath), key)) {
                    return {
                      done: true,
                      fromPath: fromPath,
                      toPath: toPath
                    };
                  } else {
                    return {
                      done: false,
                      fromPath: fromPath,
                      toPath: toPath
                    };
                  }
                });

                return Promise
                  .all(_.map(filesInChunkWithStatus, file => {
                    if (file.done) {
                      progress({
                        error: false,
                        message: `Already modified image ${file.toPath}`,
                        currentStep,
                        steps
                      });

                      return Promise.resolve(file);
                    }

                    const handleError = (error) => {
                      progress({
                        error: error,
                        message: `Could not modify image ${file.fromPath}`,
                        currentStep,
                        steps
                      });

                      _.attempt(onError, error, file.fromPath);

                      return null;
                    };

                    /* resize (and maybe minify) */

                    if (resize) {
                      return startImageModificationProcess([
                        file.fromPath,
                        file.toPath,
                        minify,
                        imageWidth,
                        imageHeight
                      ])
                        .then(() => file)
                        .catch(handleError);
                    }

                    /* only minify */

                    return startImageModificationProcess([
                      file.fromPath,
                      file.toPath,
                      minify
                    ])
                      .then(() => file)
                      .catch(handleError);
                  }))
                  .then(processedFiles => {
                    const numProcessedFiles = _.size(processedFiles);
                    const successfullyProcessedFiles = _.compact(processedFiles);

                    return Promise
                      .all(_.map(successfullyProcessedFiles, file => database.insert(path.basename(file.toPath), key)))
                      .then(() => database.save())
                      .then(() => {
                        const currentFiles = _.map(successfullyProcessedFiles, file => _.omit(file, "done"));

                        return {
                          files: previousFiles.concat(currentFiles),
                          currentStep: currentStep + numProcessedFiles
                        };
                      });
                  });
              }),
            Promise.resolve({
              currentStep: stepAndAllFiles.currentStep,
              files: []
            }));
        } else {
          return stepAndAllFiles;
        }
      })
      .then(stepAndFiles => {
        progress({
          error: false,
          message: "Modified images",
          currentStep: steps,
          steps
        });

        const modifiedFiles = _.map(stepAndFiles.files, file => {
          database.insert(path.basename(file.toPath), key);
          return file.toPath;
        });

        return database
          .save()
          .then(() => modifiedFiles);
      });
  };
}

function startImageModificationProcess(args) {
  return new Promise((resolve, reject) => {
    const cp = fork(`${__dirname}/modifyImageProcess.js`, args);

    cp.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Could not modify image with args"));
      }
    });
  });
}
