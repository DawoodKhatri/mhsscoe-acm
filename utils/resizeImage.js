import Jimp from "jimp";

export default async (image) => {
  image = await Jimp.read(image);

  const { width, height } = image.bitmap;

  let resizeWidth, resizeHeight;

  if (width < height && width > 192) {
    resizeWidth = 192;
    resizeHeight = (height / width) * 192;
  } else if (height < width && height > 192) {
    resizeWidth = (width / height) * 192;
    resizeHeight = 192;
  } else {
    resizeWidth = width;
    resizeHeight = height;
  }

  image = image.resize(resizeWidth, resizeHeight);

  return await image.getBufferAsync(Jimp.MIME_JPEG)
};
