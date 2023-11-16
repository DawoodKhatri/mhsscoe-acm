import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return errorResponse(400, "Please fill all the fields");

    await connectDB();

    const user = await User.findOne({ email }).select("password");
    if (!user) return errorResponse(404, "Account not found");

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) return errorResponse(403, "Incorrect Credentials");

    const response = successResponse(200, "Logged in successfully");

    const token = user.generateToken();

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
