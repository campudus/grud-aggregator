require('babel-core/register');
const imageResizer = require('./imageResizer');
const fromPath = process.argv[2];
const toPath = process.argv[3];
const minify = JSON.parse(process.argv[4]);
const imageWidth = process.argv[5];
const imageHeight = process.argv[6];

if (imageWidth && imageHeight) {
  const options = {
    fromPath,
    toPath,
    minify,
    imageWidth : (imageWidth === 'auto') ? 'auto' : JSON.parse(imageWidth),
    imageHeight : (imageHeight === 'auto') ? 'auto' : JSON.parse(imageHeight)
  };

  imageResizer.generateThumb(options)
    .then(() => process.exit(0))
    .catch(err => {
      console.log('Could not generate thumb', options, err);
      process.exit(1);
    });
} else {
  const options = {
    fromPath,
    toPath,
    minify
  };
  imageResizer.reduceImage(options)
    .then(() => process.exit(0))
    .catch(err => {
      console.log('Could not reduce image', options, err);
      process.exit(1);
    });
}
