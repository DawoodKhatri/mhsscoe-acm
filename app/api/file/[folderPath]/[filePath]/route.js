import { getFileStream, getUrl } from "@/utils/firebaseStorage";
import { errorResponse } from "@/utils/sendResponse";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { folderPath, filePath } }) => {
  try {
    const fileUrl = await getUrl(`${folderPath}/${filePath}`);
    const { data: fileStream } = await axios({
      url: fileUrl,
      responseType: "stream",
      method: "get",
    });
    // return new NextResponse(await getFileStream(`${folderPath}/${filePath}`));
    return new NextResponse(fileStream);
  } catch (error) {
    return errorResponse(404, "File not found");
  }
};
