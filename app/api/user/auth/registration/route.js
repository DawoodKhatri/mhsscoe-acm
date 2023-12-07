import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { verifyEmailToken } from "@/utils/verification";

export const POST = async (req) => {
  try {
    const { token: emailToken, password } = await req.json();
    if (!emailToken || !password)
      return errorResponse(400, "Please fill all the fields");

    const { email } = verifyEmailToken(emailToken);
    if (!email) return errorResponse(401, "Invalid token");

    await connectDB();

    let user = await User.findOne({ email }).select("+password");

    if (user) {
      if (user.password) return errorResponse(403, "Already registered");
    } else {
      user = await User.create({ email, password });
    }

    const response = successResponse(200, "Registration done successfully");

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
