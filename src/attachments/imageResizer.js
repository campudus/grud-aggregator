import fs from 'fs-extra';
import jimp from 'jimp';
import imagemin from 'imagemin';
import pngquant from 'imagemin-pngquant';

export function generateThumb(options) {
  const {fromPath, toPath, imageHeight, imageWidth, minify} = options;
  return readImage(fromPath)
    .then(resizeImage({imageHeight, imageWidth}))
    .then(minifyImage(minify))
    .then(saveImage(toPath));
}

export function reduceImage(options) {
  const {fromPath, toPath} = options;
  return readImage(fromPath)
    .then(image => {
      return new Promise((resolve, reject) => {
        image.getBuffer(image._originalMime, (err, buffer) => {
          if (err) {
            console.log(`could not get buffer to copy with mime type ${image._originalMime}`);
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

function resizeImage({
  imageHeight = 'auto',
  imageWidth = 'auto'
}) {
  const height = imageHeight === 'auto' ? jimp.AUTO : imageHeight;
  const width = imageWidth === 'auto' ? jimp.AUTO : imageWidth;
  const isFittingToScale = imageHeight !== 'auto' && imageWidth !== 'auto';
  return image => new Promise((resolve, reject) => {
    // resize the width to <imageSize> and scale the height accordingly
    try {
      const bufferCb = (err, buffer) => {
        if (err) {
          console.log(`could not get buffer to resize with mime type ${image._originalMime}`);
          reject(err);
        } else {
          resolve(buffer);
        }
      };
      if (isFittingToScale) {
        image
          .contain(width, height)
          .getBuffer(image._originalMime, bufferCb);
      } else {
        image
          .resize(width, height)
          .getBuffer(image._originalMime, bufferCb);
      }
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
  return imagemin.buffer(buffer, {
    plugins : [
      pngquant()
    ]
  });
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
