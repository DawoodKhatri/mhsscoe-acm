import { getFileStream } from "@/utils/firebaseStorage";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { folderPath, filePath } }) => {
  return new NextResponse(await getFileStream(`${folderPath}/${filePath}`));
};
