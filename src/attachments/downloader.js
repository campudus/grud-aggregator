import fs from 'fs-extra';
import http from 'http';
import path from 'path';
import _ from 'lodash';

export function downloader({
  database,
  pimUrl,
  progress,
  downloadPath,
  errorImage
} = {}) {

  if (_.isEmpty(database)) {
    throw new Error('Missing database option');
  }

  if (_.isEmpty(pimUrl)) {
    throw new Error('Missing pimUrl option');
  }

  if (_.isEmpty(downloadPath)) {
    throw new Error('Missing downloadPath option');
  }

  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error('Option `progress` needs to be a function ({error, message, currentStep, steps}).');
  }

  if (!_.isNil(errorImage) && (!_.isString(errorImage) || _.isEmpty(errorImage))) {
    throw new Error('Option `errorImage` expects a path as string to a file');
  }

  return attachments => {
    const steps = attachments.length;
    let currentStep = 0;

    if (progress) {
      progress({
        error : false,
        message : 'Start downloading attachments',
        currentStep,
        steps
      });
    }

    return _.reduce(attachments, (promise, attachment) => promise.then(list => {
      if (_.isEmpty(attachment.url) || _.isEmpty(attachment.path)) {
        return Promise.reject(new Error('Expected array of {url, path} mappings.'));
      } else {
        const from = `${pimUrl}${attachment.url}`;
        const to = `${downloadPath}/${attachment.path}`;
        currentStep = currentStep + 1;
        if (database.find(path.basename(to), 'downloaded')) {
          if (progress) {
            progress({
              error : false,
              message : `Already downloaded file ${to}`,
              currentStep,
              steps
            });
          }
          return Promise.resolve(list.concat([to]));
        } else {
          return download(from, to)
            .then(to => {
              database.insert(path.basename(to), 'downloaded');
              return database.save();
            })
            .then(() => {
              if (progress) {
                progress({
                  error : false,
                  message : `Downloaded ${to} from ${from}`,
                  currentStep,
                  steps
                });
              }
              return list.concat([to]);
            })
            .catch(err => {
              if (errorImage) {
                return copyFile(errorImage, to)
                  .then(() => {
                    if (progress) {
                      progress({
                        error : true,
                        message : `Downloaded ${to} from ${from}`,
                        currentStep,
                        steps
                      });
                    }
                    return list.concat([to]);
                  });
              } else {
                return Promise.reject(err);
              }
            });
        }
      }
    }), Promise.resolve([]));
  };

}

function copyFile(from, to) {
  return new Promise((resolve, reject) => {
    fs.copy(from, to, err => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
}

function download(url, path) {
  return new Promise((resolve, reject) => {
    http
      .get(url, response => {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(path);
          response.pipe(file)
            .on('close', () => {
              resolve(path);
            })
            .on('error', unlinkOnError(reject));
        } else {
          console.error(`Download of ${url} failed with status code ${response.statusCode}`);
          reject(new Error(`Download of ${url} failed with status code ${response.statusCode}.\n`));
        }
      })
      .on('error', unlinkOnError(reject));
  });

  function unlinkOnError(reject) {
    return err => {
      console.error('Could not download file.', url, path, err.message);
      fs.unlink(path, () => {
        reject(err);
      });
    };
  }
}
