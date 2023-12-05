import cloudinary from "@/config/cloudinary";

export const uploadFile = async (filebuffer, folder, fileName) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `MHSSCOE ACM/${folder}`,
            ...{ unique_filename: !fileName },
            ...{ public_id: fileName ?? undefined },
          },
          (error, uploadResult) => {
            if (error) {
              reject(error);
            } else {
              resolve(uploadResult);
            }
          }
        )
        .end(filebuffer);
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
