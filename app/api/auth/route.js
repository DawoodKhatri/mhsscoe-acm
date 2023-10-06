import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const POST = async (req) => {
  try {
    const authId = await checkAuth(req);
    if (!authId)
      return successResponse(200, "Auth Check", { isLoggedIn: false });

    let auth = await User.findById(authId);
    if (!auth) return successResponse(200, "Auth Check", { isLoggedIn: false });

    return successResponse(200, "Auth Check", { isLoggedIn: true });
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
