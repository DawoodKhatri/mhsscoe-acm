import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");

    return successResponse(200, "Profile Status", {
      isProfileIncomplete: user.profilePicture && user.year ? false : true,
    });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
