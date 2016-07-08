import _ from 'lodash';
import http from 'http';
import fs from 'fs';
import { generateThumb, reduceImage } from './imageResizer';

export function downloadAndResizeAttachments({
  database, dataDirectory, pimUrl, progress, errorProgress, maxImageSize, errorImage
}, attachments) {
  const chunkSize = 2;
  // split list up into partitions
  const chunks = _.chunk(attachments, chunkSize);

  const directory = `${dataDirectory}/attachments`;
  const directoryThumb = `${directory}/thumb`;
  const directoryReduced = `${directory}/reduced`;

  const preparePromise = _mkdir(directory)
    .then(() => _mkdir(directoryThumb))
    .then(() => _mkdir(directoryReduced))
    .then(() => ({done : 0, total : attachments.length}));

  return _.reduce(chunks, (promise, attachmentsInChunk) => promise.then(currentProgress => {
    return Promise.all(_.map(attachmentsInChunk, item => {

      const url = `${pimUrl}${item.url}`;
      const path = `${directory}/${item.path}`;
      const pathThumb = `${directoryThumb}/${item.path}`;
      const pathReduced = `${directoryReduced}/${item.path}`;
      const pathError = errorImage;

      database.defaults({
        attachments : {}
      }).value();

      const currentInfo = database.get('attachments')
        .defaultsDeep({[item.path] : {id : item.path, downloaded : false, thumbnailed : false, minified : false}})
        .get(item.path)
        .value();

      return Promise.resolve()
        .then(() => {
          console.log('downloading', url);
          const downloader = (currentInfo.downloaded) ? Promise.resolve(path) : download(url, path);
          return downloader.then(() => {
            console.log('Writing download in database');
            return database.get('attachments')
              .get(item.path)
              .assign({downloaded : true})
              .value();
          });
        })
        .catch(err => {
          console.error('Error downloading', err);
          errorProgress({message : `Could not download ${item.path}`, error : err});
          return Promise.reject(err);
        })
        .then(() => {
          const thumbnailer = (currentInfo.thumbnailed) ? Promise.resolve(pathThumb) : thumbnail(path, pathThumb);
          return thumbnailer.then(() => {
            return database.get('attachments')
              .get(item.path)
              .assign({thumbnailed : true})
              .value();
          });
        })
        .catch(err => {
          errorProgress({message : `Could not thumbnail ${item.path}`, error : err});
          return Promise.reject(err);
        })
        .then(() => {
          const minifier = (currentInfo.minified) ? Promise.resolve(pathReduced) : minify(path, pathReduced);
          return minifier.then(() => {
            return database.get('attachments')
              .get(item.path)
              .assign({minified : true})
              .value();
          });
        })
        .catch(err => {
          errorProgress({message : `Could not minify ${item.path}`, error : err});
          return Promise.reject(err);
        })
        .catch(() => {
          database.get('attachments')
            .get(item.path)
            .assign({id : item.path, downloaded : false, thumbnailed : false, minified : false})
            .value();

          return copyFile(pathError, [path, pathThumb, pathReduced]);
        });

    })).then(() => {
      return database
        .write()
        .catch(err => {
          console.error('Could not write to database!', err);
          errorProgress({message : 'Could not save database!', error : err});
        });
    }).then(() => {
      currentProgress.done = currentProgress.done + attachmentsInChunk.length;
      progress({currentProgress, message : `Finished chunk of size ${attachmentsInChunk.length}`});
      return currentProgress;
    });

  }), preparePromise);

  function download(url, path) {
    return new Promise((resolve, reject) => {
      http
        .get(url, response => {
          if (response.statusCode === 200) {
            const file = fs.createWriteStream(path);
            response.pipe(file);
          } else {
            console.error(`Download of ${url} failed with status code ${response.statusCode}`);
            reject(new Error(`Download of ${url} failed with status code ${response.statusCode}.\n`));
          }
        })
        .on('close', () => {
          resolve(path);
        })
        .on('error', err => {
          console.error('Could not download file.', url, path, err.message);

          fs.unlink(path, () => {
            reject(err);
          });
        });
    });
  }

  function thumbnail(from, to) {
    return statOf(from)
      .then(stats => {
        if (stats.size > maxImageSize) {
          throw new Error('Image too big to thumbnail!');
        } else {
          return generateThumb({fromPath : from, toPath : to, minify : true});
        }
      });
  }

  function minify(from, to) {
    return statOf(from)
      .then(stats => {
        if (stats.size > maxImageSize) {
          return reduceImage({fromPath : from, toPath : to, minify : false});
        } else {
          return reduceImage({fromPath : from, toPath : to, minify : true});
        }
      });
  }

  function copyFile(from, toPaths) {
    return new Promise((resolve, reject) => {
      const reader = fs.createReadStream(from);

      toPaths.forEach(p => {
        const file = fs.createWriteStream(p);
        reader.pipe(file);
      });

      reader.on('close', resolve);
      reader.on('error', reject);
    });
  }

  function statOf(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (!err) {
          resolve({...stats, exists : true});
        } else if (err && err.code === 'ENOENT') {
          resolve({exists : false});
        } else {
          reject(err);
        }
      });
    });
  }

  function _mkdir(path) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, error => {
        if (error === null || error.code === 'EEXIST') {
          resolve(path);
        } else {
          reject(error);
        }
      });
    });
  }

}
