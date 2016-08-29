import path from 'path';
import _ from 'lodash';
import {generateThumb, reduceImage} from './imageResizer';

export function modifyImages({
  chunkSize = 1,
  imageWidth = 'auto',
  imageHeight = 'auto',
  database,
  key,
  minify = false,
  outPath = 'out',
  progress = () => {
  }
} = {
  chunkSize : 1,
  imageWidth : 'auto',
  imageHeight : 'auto',
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
    const resize = imageWidth !== 'auto' || imageHeight !== 'auto';
    const steps = inputs.length;

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
        if (resize || minify) { // resize can resize AND minify at the same time
          return _.reduce(_.chunk(stepAndFiles.files, chunkSize), (promise, chunkFiles) => promise.then(status => {

            const doing = resize && minify ? 'Resizing and minifying' : resize ? 'Resizing' : 'Minifying';
            const multiple = chunkSize > 1;

            progress({
              error : false,
              message : `${doing} image${multiple ? 's' : ''} ${_.map(chunkFiles, file => file.fromPath).join(', ')}`,
              currentStep : status.currentStep,
              steps
            });

            const filesInChunkWithStatus = _.map(chunkFiles, file => {
              const to = file.toPath;
              if (database.find(path.basename(to), key)) {
                return {
                  done : true,
                  fromPath : file.fromPath,
                  toPath : to
                };
              } else {
                return {
                  done : false,
                  fromPath : file.fromPath,
                  toPath : to
                };
              }
            });

            return Promise.all(_.map(filesInChunkWithStatus, file => {
              if (file.done) {
                return Promise.resolve(file);
              } else if (resize) { // resize (and maybe minify)
                return generateThumb({
                  ...file,
                  imageWidth,
                  imageHeight,
                  minify
                }).then(() => file);
              } else { // only minify
                return reduceImage({
                  ...file
                }).then(() => file);
              }
            }))
              .then(() => {
                return {
                  files : status.files.concat(_.map(filesInChunkWithStatus, file => _.omit(file, 'done'))),
                  currentStep : status.currentStep + 1
                };
              });
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

        return database.save()
          .then(() => modifiedFiles);
      });
  }
    ;
}
