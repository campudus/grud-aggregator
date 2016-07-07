import fs from 'fs-extra';
import jimp from 'jimp';
import imagemin from 'imagemin';
import pngquant from 'imagemin-pngquant';
import mime from 'mime';

export function generateThumb(options) {
  const {fromPath, toPath, minify} = options;
  const mimetype = mime.lookup(fromPath);
  return readImage(fromPath)
    .then(resizeImage(mimetype))
    .then(minifyImage(minify))
    .then(saveImage(toPath));
}

export function reduceImage(options) {
  const {fromPath, toPath} = options;
  return readImage(fromPath)
    .then(jimpImage => {
      return new Promise((resolve, reject) => {
        jimpImage.getBuffer(jimpImage._originalMime, (err, buffer) => {
          if (err) {
            console.log(`could not get buffer to copy with mime type ${jimpImage._originalMime}`);
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });
    })
    .then(minifyImage(true))
    .then(saveImage(toPath));
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
    // resize the width to 150 and scale the height accordingly
    try {
      image
        .resize(500, jimp.AUTO)
        .getBuffer(mimetype, (err, buffer) => {
          if (err) {
            console.log(`could not get buffer to resize with mime type ${mimetype}`);
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

function minifyImage(minify) {
  return buffer => {
    if (minify) {
      return minifyImageBuffer(buffer);
    } else {
      return buffer;
    }
  };
}

function minifyImageBuffer(buffer) {
  try {
    return imagemin.buffer(buffer, {
      plugins : [
        pngquant()
      ]
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

function saveImage(toPath) {
  return buffer => new Promise((resolve, reject) => {
    fs.outputFile(toPath, buffer, err => {
      if (err) {
        return reject(err);
      } else {
        return resolve(toPath);
      }
    });
  });
}
