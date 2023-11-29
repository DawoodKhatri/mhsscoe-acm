import { getFileStream, getUrl } from "@/utils/firebaseStorage";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { folderPath, filePath } }) => {
  const fileUrl = await getUrl(`${folderPath}/${filePath}`);
  const res = await fetch(fileUrl);
  return new NextResponse(res.body);
};
