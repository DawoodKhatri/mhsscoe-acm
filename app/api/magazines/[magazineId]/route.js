import { errorResponse, successResponse } from "@/utils/sendResponse";
import Magazine from "@/models/magazine";
import { connectDB } from "@/config/database";

export const GET = async (req, { params: { magazineId } }) => {
  try {
    await connectDB();
    const magazine = await Magazine.findById(magazineId);
    if (!magazine) return errorResponse(404, "Magazine not found");
    return successResponse(200, "Magazine Details", { magazine });
  } catch (error) {
    console.log(error);
    return errorResponse();
  }
};
