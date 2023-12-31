import { errorResponse, successResponse } from "@/utils/sendResponse";
import { getPdfDocument, getPdfPage } from "@/utils/pdfHandler";
import Magazine from "@/models/magazine";
import { connectDB } from "@/config/database";
import { uploadFile } from "@/utils/cloudinaryStorage";
import { Blob } from "buffer";

export const GET = async (req) => {
  try {
    await connectDB();
    let magazines = await Magazine.find();
    magazines = magazines.map(({ _doc: { pages, ...details } }) => ({
      ...details,
      thumbnail: pages[0],
    }));

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

    let progress = 0;

    const magazinePages = await Promise.all(
      Array(document.numPages)
        .fill(null)
        .map(async (val, pageIndex) => {
          const pageBuffer = (
            await getPdfPage(document, pageIndex + 1)
          ).toDataURL("image/jpeg");
          const pagePath = await uploadFile(
            pageBuffer,
            `Magazines/${magazine._id}`
          );

          progress += 1;
          console.log(
            `Uploaded ${Number((progress / document.numPages) * 100).toFixed(
              0
            )}%`
          );
          return pagePath;
        })
    );

    magazine.pages = magazinePages;
    await magazine.save();

    return successResponse(200, "Magazine Published");
  } catch (error) {
    console.log(error);
    return errorResponse();
  }
};
