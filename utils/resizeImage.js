import Jimp from "jimp";

export default async (image) => {
  image = await Jimp.read(image);

  const { width, height } = image.bitmap;

  let resizeWidth,
    resizeHeight,
    maxDimension = 192;

  if (width <= maxDimension && height <= maxDimension) {
    resizeWidth = width;
    resizeHeight = height;
  } else {
    if (width > height) {
      resizeWidth = maxDimension;
      resizeHeight = Math.round((maxDimension / width) * height);
    } else {
      resizeHeight = maxDimension;
      resizeWidth = Math.round((maxDimension / height) * width);
    }
  }

  image = image.resize(resizeWidth, resizeHeight);

  return await image.getBufferAsync(Jimp.MIME_JPEG);
};
