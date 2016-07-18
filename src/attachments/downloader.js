import fs from 'fs-extra';
import http from 'http';
import path from 'path';
import _ from 'lodash';

export function downloader({
  database,
  pimUrl,
  downloadPath
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

  return attachments => {
    return Promise.all(_.map(attachments, a => {
      if (_.isEmpty(a.url) || _.isEmpty(a.path)) {
        return Promise.reject(new Error('Expected array of {url, path} mappings.'));
      } else {
        const from = `${pimUrl}${a.url}`;
        const to = `${downloadPath}/${a.path}`;
        if (database.find(path.basename(to), 'downloaded')) {
          return Promise.resolve(to);
        } else {
          return download(from, to)
            .then(to => {
              database.insert(path.basename(to), 'downloaded');
              return database.save().then(() => to);
            });
        }
      }
    }));
  };

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
