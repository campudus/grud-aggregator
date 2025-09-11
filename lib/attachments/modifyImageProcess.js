"use strict";

require("@babel/register");
var imageResizer = require("./imageResizer");
var fromPath = process.argv[2];
var toPath = process.argv[3];
var minify = JSON.parse(process.argv[4]);
var trim = JSON.parse(process.argv[5]);
var imageWidth = process.argv[6];
var imageHeight = process.argv[7];
if (imageWidth && imageHeight) {
  var resizeOptions = {
    fromPath: fromPath,
    toPath: toPath,
    minify: minify,
    trim: trim,
    imageWidth: imageWidth === "auto" ? null : JSON.parse(imageWidth),
    imageHeight: imageHeight === "auto" ? null : JSON.parse(imageHeight)
  };
  imageResizer.generateThumb(resizeOptions).then(function () {
    return process.exit(0);
  }).catch(function (err) {
    console.log("Could not generate thumb", resizeOptions, err);
    process.exit(1);
  });
} else if (minify) {
  var reduceOptions = {
    fromPath: fromPath,
    toPath: toPath,
    trim: trim
  };
  imageResizer.reduceImage(reduceOptions).then(function () {
    return process.exit(0);
  }).catch(function (err) {
    console.log("Could not reduce image", reduceOptions, err);
    process.exit(1);
  });
} else {
  var trimOptions = {
    fromPath: fromPath,
    toPath: toPath
  };
  imageResizer.trimImage(trimOptions).then(function () {
    return process.exit(0);
  }).catch(function (err) {
    console.log("Could not trim image", trimOptions, err);
    process.exit(1);
  });
}