import cloudinary from "@/config/cloudinary";

export const uploadFile = async (filebuffer, folder, fileName, mimeType) => {
  try {
    const base64Data = Buffer.from(filebuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + "base64" + "," + base64Data;

    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: `MHSSCOE ACM/${folder}`,
      ...{ unique_filename: !fileName },
      ...{ public_id: fileName ?? undefined },
    });

    return uploadResult.public_id.replace("MHSSCOE ACM/", "");
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  try {
    await cloudinary.uploader.destroy(`MHSSCOE ACM/${filePath}`);
  } catch (error) {
    throw error;
  }
};

export const getFileUrl = async (filePath) => {
  try {
    return cloudinary.url(`MHSSCOE ACM/${filePath}`);
  } catch (error) {
    throw error;
  }
};
