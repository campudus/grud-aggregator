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
    var options = {
      fromPath: fromPath,
      toPath: toPath,
      minify: minify,
      imageWidth: imageWidth === 'auto' ? 'auto' : JSON.parse(imageWidth),
      imageHeight: imageHeight === 'auto' ? 'auto' : JSON.parse(imageHeight)
    };

    imageResizer.generateThumb(options).then(function () {
      return process.exit(0);
    }).catch(function (err) {
      console.log('Could not generate thumb', options, err);
      process.exit(1);
    });
  })();
} else {
  (function () {
    var options = {
      fromPath: fromPath,
      toPath: toPath,
      minify: minify
    };
    imageResizer.reduceImage(options).then(function () {
      return process.exit(0);
    }).catch(function (err) {
      console.log('Could not reduce image', options, err);
      process.exit(1);
    });
  })();
}