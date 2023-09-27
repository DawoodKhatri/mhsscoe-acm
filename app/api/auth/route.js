import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const authId = await checkAuth(req);
    if (!authId) return errorResponse(401, "Logged out");

    let auth = await User.findById(authId);
    // if(!auth) auth = await

    return successResponse(200, "Logged in", auth);
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (req) => {
  try {
    const response = successResponse(200, "Logged out successfully");
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
