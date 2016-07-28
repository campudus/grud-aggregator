import path from 'path';
import _ from 'lodash';
import { generateThumb, reduceImage } from './imageResizer';

export function modifyImages({
  imageWidth = 0,
  database,
  key,
  minify = false,
  outPath = 'out',
  progress = () => {
  }
} = {
  imageWidth : 0,
  minify : false,
  dataDirectory : 'out',
  outPath : 'out',
  progress : () => {
  }
}) {
  if (_.isEmpty(key)) {
    throw new Error('Missing key option');
  }

  if (_.isEmpty(database)) {
    throw new Error('Missing database option');
  }

  return images => {
    if (!_.isArray(images)) {
      throw new Error('Expected Array as images');
    }

    const inputs = _.map(images, i => ({
      fromPath : i,
      toPath : `${outPath}/${path.basename(i)}`
    }));
    const resize = imageWidth > 0;
    const steps = inputs.length * ((resize ? 1 : 0) + (minify ? 1 : 0));

    return Promise.resolve({currentStep : 0, files : inputs})
      .then(stepAndFiles => {
        progress({
          error : false,
          message : 'Modifying images',
          currentStep : stepAndFiles.currentStep,
          steps
        });
        return stepAndFiles;
      })
      .then(stepAndFiles => {
        if (resize) {
          return _.reduce(stepAndFiles.files, (promise, file) => promise.then(({currentStep, files}) => {
            progress({
              error : false,
              message : `Resizing image ${file.fromPath}`,
              currentStep,
              steps
            });
            const to = file.toPath;
            const result = {
              files : files.concat([{
                fromPath : to,
                toPath : to
              }]),
              currentStep : currentStep + 1
            };

            if (database.find(path.basename(to), key)) {
              return result;
            } else {
              return generateThumb({
                ...file,
                imageWidth
              }).then(() => result);
            }
          }), Promise.resolve({currentStep : stepAndFiles.currentStep, files : []}));
        } else {
          return stepAndFiles;
        }
      })
      .then(stepAndFiles => {
        if (minify) {
          return _.reduce(stepAndFiles.files, (promise, file) => promise.then(({currentStep, files}) => {
            progress({
              error : false,
              message : `Minifying image ${file.fromPath}`,
              currentStep,
              steps
            });
            const to = file.toPath;
            const result = {
              files : files.concat([{
                fromPath : to,
                toPath : to
              }]),
              currentStep : currentStep + 1
            };

            if (database.find(path.basename(to), key)) {
              return result;
            } else {
              return reduceImage({...file}).then(() => result);
            }
          }), Promise.resolve({currentStep : stepAndFiles.currentStep, files : []}));
        } else {
          return stepAndFiles;
        }
      })
      .then(stepAndFiles => {
        progress({
          error : false,
          message : 'Modified images',
          currentStep : steps,
          steps
        });
        const modifiedFiles = _.map(stepAndFiles.files, file => {
          database.insert(path.basename(file.toPath), key);
          return file.toPath;
        });

        return database.save().then(() => modifiedFiles);
      });
  };
}
