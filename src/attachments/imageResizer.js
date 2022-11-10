import sharp from "sharp";

export function generateThumb(options) {
  const { fromPath, toPath, imageHeight, imageWidth, minify = false } = options;

  return getTransformer({ fromPath, resize: true, imageHeight, imageWidth, minify }).then(sharpObj => sharpObj.toFile(toPath));
}

export function reduceImage(options) {
  const { fromPath, toPath } = options;

  return getTransformer({ fromPath, resize: false, minify: true }).then(sharpObj => sharpObj.toFile(toPath));
}

function getTransformer({ fromPath, resize, imageHeight, imageWidth, minify }) {
  return new Promise((resolve, reject) => {
    try {
      const transformer = sharp(fromPath);

      if (resize) {
        transformer.resize({
          width: imageWidth,
          height: imageHeight,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
      }

      transformer.jpeg({ quality: minify ? 80 : 95, chromaSubsampling: minify ? "4:2:0" : "4:4:4", force: false })
        .png({ force: false, palette: minify, compressionLevel: 9, adaptiveFiltering: true });

      resolve(transformer);
    } catch (err) {
      reject(err);
    }
  });
}
