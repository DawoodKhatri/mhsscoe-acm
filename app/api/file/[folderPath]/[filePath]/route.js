import { getFileStream, getUrl } from "@/utils/firebaseStorage";
import { errorResponse } from "@/utils/sendResponse";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { folderPath, filePath } }) => {
  try {
    const fileUrl = await getUrl(`${folderPath}/${filePath}`);
    const res = await fetch(fileUrl);
    return new NextResponse(res.body);
  } catch (error) {
    return errorResponse(404, "File not found");
  }
};
