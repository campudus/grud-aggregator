require("@babel/register");
const imageResizer = require("./imageResizer");
const fromPath = process.argv[2];
const toPath = process.argv[3];
const minify = JSON.parse(process.argv[4]);
const imageWidth = process.argv[5];
const imageHeight = process.argv[6];

if (imageWidth && imageHeight) {
  const resizeOptions = {
    fromPath: fromPath,
    toPath: toPath,
    minify: minify,
    imageWidth: (imageWidth === "auto") ? "auto" : JSON.parse(imageWidth),
    imageHeight: (imageHeight === "auto") ? "auto" : JSON.parse(imageHeight)
  };

  imageResizer
    .generateThumb(resizeOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.log("Could not generate thumb", resizeOptions, err);
      process.exit(1);
    });
} else {
  const reduceOptions = {
    fromPath: fromPath,
    toPath: toPath,
    minify: minify
  };
  imageResizer
    .reduceImage(reduceOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.log("Could not reduce image", reduceOptions, err);
      process.exit(1);
    });
}
