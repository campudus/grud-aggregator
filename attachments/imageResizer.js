import fs from 'fs';
import jimp from 'jimp';
import imagemin from 'imagemin';
import jpegtran from 'imagemin-jpegtran';
import pngquant from 'imagemin-pngquant';
import mime from 'mime';

export function generateThumb(fromPath, toPath) {
  const mimetype = mime.lookup(fromPath);
  return readImage(fromPath)
    .then(resizeImage(mimetype))
    .then(minifyImage(toPath));
}

export function reduceImage(fromPath, toPath) {
  return readImage(fromPath)
    .then(() => minifyImage(toPath)(fromPath));
}

function readImage(fromPath) {
  return new Promise((resolve, reject) => {
    jimp.read(fromPath, (err, image) => {
      if (err) {
        console.log(`Could not read ${fromPath}`);
        reject(err);
      } else {
        resolve(image);
      }
    });
  });
}

function resizeImage(mimetype) {
  return image => new Promise((resolve, reject) => {
    console.log(`resizing ${mimetype}`);
    // resize the width to 150 and scale the height accordingly
    try {
      image
        .resize(150, jimp.AUTO)
        .getBuffer(mimetype, (err, buffer) => {
          if (err) {
            console.log(`could not get buffer for ${mimetype}`);
            reject(err);
          } else {
            resolve(buffer);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

function minifyImage(toPath) {
  return source => new Promise((resolve, reject) => {
    console.log(`minifying ${toPath}`);
    try {
      imagemin()
        .src(source)
        .use(pngquant())
        .use(jpegtran({progressive : true}))
        .run((err, files) => {
          if (err) {
            reject(err);
          } else if (files.length !== 1) {
            reject(new Error('files should be of length 1'));
          } else {
            const vinyl = files[0];
            const stream = fs.createWriteStream(toPath);
            vinyl.pipe(stream);

            stream.on('error', err => {
              console.error('Failed to create image', path, toPath, err);
              return reject(err);
            });
            stream.on('finish', () => resolve(toPath));
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}
