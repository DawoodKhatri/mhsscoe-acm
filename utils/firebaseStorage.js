import { ref, uploadBytes, getDownloadURL, getStream } from "firebase/storage";
import storage from "@/config/firebase";

export const upload = async (folder, fileName, fileBuffer, fileMimeType) => {
  //   let fileExtension = fileOriginalName.toString().split(".");
  //   fileExtension =
  //     fileExtension.length > 1
  //       ? "." + fileExtension[fileExtension.length - 1]
  //       : "";
  //   const randomName = uuid();
  //   const fileName = randomName + "-" + Date.now() + fileExtension;
  const imageRef = ref(storage, `${folder}/${fileName}`);
  const uploadPath = (
    await uploadBytes(imageRef, fileBuffer, { contentType: fileMimeType })
  ).ref.fullPath;
  return uploadPath;
};

export const getUrl = async (filePath) => {
  const storageRef = ref(storage, filePath);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};

export const getFileStream = async (filePath) => {
  const storageRef = ref(storage, filePath);
  const fileStream = getStream(storageRef);
  return fileStream;
};
