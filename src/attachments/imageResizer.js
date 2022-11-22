import sharp from "sharp";

export function generateThumb(options) {
  return modifyImage({ ...options, resize: true });
}

export function reduceImage(options) {
  return modifyImage({ ...options, resize: false, minify: true });
}

export function trimImage(options) {
  return modifyImage({ ...options, resize: false, minify: false, trim: true });
}

function modifyImage({ fromPath, toPath, resize, imageHeight, imageWidth, minify, trim }) {
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

      if (trim) {
        transformer.trim();
      }

      transformer.jpeg({ quality: minify ? 80 : 95, chromaSubsampling: minify ? "4:2:0" : "4:4:4", force: false })
        .png({ force: false, palette: minify, compressionLevel: 9, adaptiveFiltering: true });

      resolve(transformer);
    } catch (err) {
      reject(err);
    }
  }).then(sharpObj => sharpObj.toFile(toPath));
}
