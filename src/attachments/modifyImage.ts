import path from "path";
import { fork } from "child_process";
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
    progress = () => {},
  }: any = {
    chunkSize: 1,
    imageWidth: "auto",
    imageHeight: "auto",
    minify: false,
    dataDirectory: "out",
    outPath: "out",
    onError: _.noop,
    progress: () => {},
  }
) {
  if (_.isEmpty(key)) {
    throw new Error("Missing key option");
  }

  if (_.isEmpty(database)) {
    throw new Error("Missing database option");
  }

  return (images) => {
    if (!_.isArray(images)) {
      throw new Error("Expected Array as images");
    }

    const inputs = _.map(images, (image) => ({
      fromPath: image,
      toPath: `${outPath}/${path.basename(image)}`,
    }));

    const resize = imageWidth !== "auto" || imageHeight !== "auto";
    const steps = inputs.length;

    return Promise.resolve({
      currentStep: 0,
      files: inputs,
    })
      .then((stepAndFiles) => {
        progress({
          error: false,
          message: "Modifying images",
          currentStep: stepAndFiles.currentStep,
          steps,
        });

        return stepAndFiles;
      })
      .then((stepAndAllFiles) => {
        // resize can resize AND minify at the same time
        if (!resize && !minify) {
          return stepAndAllFiles;
        }

        const chunkedFiles = _.chunk(stepAndAllFiles.files, chunkSize);
        const stepAndFiles = Promise.resolve({
          currentStep: stepAndAllFiles.currentStep,
          files: [],
        });

        return _.reduce(
          chunkedFiles,
          (promise, chunkFiles) =>
            promise.then((stepAndFiles) => {
              const { currentStep, files: previousFiles } = stepAndFiles;

              const doing =
                resize && minify ? "Resizing and minifying" : resize ? "Resizing" : "Minifying";
              const multiple = chunkSize > 1;

              progress({
                error: false,
                message: `${doing} image${multiple ? "s" : ""} ${_.map(
                  chunkFiles,
                  (file) => file.fromPath
                ).join(", ")}`,
                currentStep,
                steps,
              });

              const numFiles = _.size(chunkFiles);

              const filesInChunkWithStatus = _.map(chunkFiles, (file) => {
                const { fromPath, toPath } = file;
                const isDone = !!database.find(path.basename(toPath), key);

                return {
                  done: isDone,
                  fromPath: fromPath,
                  toPath: toPath,
                };
              });

              return Promise.all(
                _.map(filesInChunkWithStatus, (file) => {
                  const { fromPath, toPath } = file;

                  if (file.done) {
                    progress({
                      error: false,
                      message: `Already modified image ${toPath}`,
                      currentStep,
                      steps,
                    });

                    return Promise.resolve(file);
                  }

                  /* resize (and maybe minify) */

                  const handleError = (error) => {
                    progress({
                      error,
                      message: `Could not modify image ${fromPath}`,
                      currentStep,
                      steps,
                    });

                    if (_.isFunction(onError)) {
                      onError(error, fromPath);
                    }

                    return {
                      ...file,
                      error,
                    };
                  };

                  const modificationArguments = [fromPath, toPath, minify];

                  if (resize) {
                    modificationArguments.push(imageWidth, imageHeight);
                  }

                  return startImageModificationProcess(modificationArguments)
                    .then(() => file)
                    .catch(handleError);
                })
              ).then((processedFiles) => {
                const successfullyProcessedFiles = _.reject(processedFiles, "error");

                return Promise.all(
                  _.map(successfullyProcessedFiles, (file) =>
                    database.insert(path.basename(file.toPath), key)
                  )
                )
                  .then(() => database.save())
                  .then(() => {
                    const currentFiles = _.map(successfullyProcessedFiles, (file) =>
                      _.omit(file, "done")
                    );

                    return {
                      files: previousFiles.concat(currentFiles),
                      currentStep: currentStep + numFiles,
                    };
                  });
              });
            }),
          stepAndFiles
        );
      })
      .then((stepAndFiles) => {
        progress({
          error: false,
          message: "Modified images",
          currentStep: steps,
          steps,
        });

        const modifiedFiles = _.map(stepAndFiles.files, (file) => {
          const { toPath } = file;

          database.insert(path.basename(toPath), key);

          return toPath;
        });

        return database.save().then(() => modifiedFiles);
      });
  };
}

function startImageModificationProcess(args) {
  return new Promise<void>((resolve, reject) => {
    const cp = fork(`${__dirname}/modifyImageProcess.js`, args);

    cp.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Could not modify image with args"));
      }
    });
  });
}
