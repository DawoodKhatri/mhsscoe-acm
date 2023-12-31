import cloudinary from "@/config/cloudinary";

export const uploadFile = async (file, folder, fileName, mimeType) => {
  try {
    let fileUri;

    if (typeof file !== "string") {
      const base64Data = Buffer.from(file).toString("base64");
      fileUri = "data:" + mimeType + ";" + "base64" + "," + base64Data;
    } else {
      fileUri = file;
    }

    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: `MHSSCOE ACM/${process.env.DB_NAME ?? "Production"}/${folder}`,
      ...{ unique_filename: !fileName },
      ...{ public_id: fileName ?? undefined },
    });

    return uploadResult.public_id.replace(
      `MHSSCOE ACM/${process.env.DB_NAME ?? "Production"}/`,
      ""
    );
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  try {
    await cloudinary.uploader.destroy(
      `MHSSCOE ACM/${process.env.DB_NAME ?? "Production"}/${filePath}`
    );
  } catch (error) {
    throw error;
  }
};

export const getFileUrl = async (filePath) => {
  try {
    return cloudinary.url(
      `MHSSCOE ACM/${process.env.DB_NAME ?? "Production"}/${filePath}`
    );
  } catch (error) {
    throw error;
  }
};
