import { errorResponse, successResponse } from "@/utils/sendResponse";
import { getPdfDocument, getPdfPage } from "@/utils/pdfHandler";
import Magazine from "@/models/magazine";
import { connectDB } from "@/config/database";
import { uploadFile } from "@/utils/cloudinaryStorage";

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

    const magazinePages = await Promise.all(
      Array(document.numPages)
        .fill(null)
        .map(async (val, pageIndex) => {
          const pageBuffer = (
            await getPdfPage(document, pageIndex + 1)
          ).toBuffer("image/jpeg");
          const pagePath = await uploadFile(
            pageBuffer,
            `Magazines/${magazine._id}`
          );
          console.log(`Uploaded Page ${pageIndex + 1}/${document.numPages}`);
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
