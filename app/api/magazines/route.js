import { errorResponse, successResponse } from "@/utils/sendResponse";
import { getPdfDocument, getPdfPage } from "@/utils/pdfHandler";
import Magazine from "@/models/magazine";
import { connectDB } from "@/config/database";
import { upload } from "@/utils/firebaseStorage";

export const GET = async (req) => {
  try {
    await connectDB();
    const magazines = await Magazine.find();
    return successResponse(200, "Magazines", { magazines });
  } catch (error) {
    console.log(error);
    return errorResponse();
  }
};

export const POST = async (req) => {
  try {
    const { title, description, file } = Object.fromEntries(
      await req.formData()
    );

    if (!title || !description || !file)
      return errorResponse(400, "Please fill all the fields");

    await connectDB();
    const magazine = await Magazine.create({ title, description });

    const document = await getPdfDocument(await file.arrayBuffer());
    const thumbnail = (await getPdfPage(document, 1)).toBuffer("image/jpeg");

    const thumbnailPath = await upload(
      "Magazine-Thumbnails",
      `${magazine._id}-${Date.now()}.jpeg`,
      thumbnail,
      "image/jpeg"
    );

    const filePath = await upload(
      "Magazines",
      `${magazine._id}-${Date.now()}.pdf`,
      await file.arrayBuffer(),
      file.type
    );

    magazine.thumbnail = thumbnailPath;
    magazine.file = filePath;
    await magazine.save();

    return successResponse(200, "Magazine Published");
  } catch (error) {
    console.log(error);
    return errorResponse();
  }
};
