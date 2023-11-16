import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    await connectDB();

    let users = await User.find({ role: { $ne: null } }).select(
      "name profilePicture branch year role"
    );
    if (!users) return errorResponse(404, "Users not found");

    return successResponse(200, "Users with Roles", { users });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
