'use strict';

require('babel-core/register');
var imageResizer = require('./imageResizer');
var fromPath = process.argv[2];
var toPath = process.argv[3];
var minify = JSON.parse(process.argv[4]);
var imageWidth = process.argv[5];
var imageHeight = process.argv[6];

if (imageWidth && imageHeight) {
  (function () {
    var resizeOptions = {
      fromPath: fromPath,
      toPath: toPath,
      minify: minify,
      imageWidth: imageWidth === 'auto' ? 'auto' : JSON.parse(imageWidth),
      imageHeight: imageHeight === 'auto' ? 'auto' : JSON.parse(imageHeight)
    };

    imageResizer.generateThumb(resizeOptions).then(function () {
      return process.exit(0);
    }).catch(function (err) {
      console.log('Could not generate thumb', resizeOptions, err);
      process.exit(1);
    });
  })();
} else {
  (function () {
    var reduceOptions = {
      fromPath: fromPath,
      toPath: toPath,
      minify: minify
    };
    imageResizer.reduceImage(reduceOptions).then(function () {
      return process.exit(0);
    }).catch(function (err) {
      console.log('Could not reduce image', reduceOptions, err);
      process.exit(1);
    });
  })();
}