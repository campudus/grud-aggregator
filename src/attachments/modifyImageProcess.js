import * as imageResizer from "./imageResizer.js";

const fromPath = process.argv[2];
const toPath = process.argv[3];
const minify = JSON.parse(process.argv[4]);
const trim = JSON.parse(process.argv[5]);
const imageWidth = process.argv[6];
const imageHeight = process.argv[7];

if (imageWidth && imageHeight) {
  const resizeOptions = {
    fromPath: fromPath,
    toPath: toPath,
    minify: minify,
    trim: trim,
    imageWidth: (imageWidth === "auto") ? null : JSON.parse(imageWidth),
    imageHeight: (imageHeight === "auto") ? null : JSON.parse(imageHeight)
  };

  imageResizer
    .generateThumb(resizeOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.log("Could not generate thumb", resizeOptions, err);
      process.exit(1);
    });
} else if (minify) {
  const reduceOptions = {
    fromPath: fromPath,
    toPath: toPath,
    trim: trim
  };
  imageResizer
    .reduceImage(reduceOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.log("Could not reduce image", reduceOptions, err);
      process.exit(1);
    });
} else {
  const trimOptions = {
    fromPath: fromPath,
    toPath: toPath
  };
  imageResizer
    .trimImage(trimOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.log("Could not trim image", trimOptions, err);
      process.exit(1);
    });
}
