import { connectDB } from "@/config/database";
import User from "@/models/user";
import Verification from "@/models/verification";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const POST = async (req) => {
  try {
    const { email, password, otp } = await req.json();

    if (!email || !password || !otp)
      return errorResponse(400, "Please fill all the fields");

    await connectDB();

    let verification = await Verification.findOne({ email, otp });
    if (!verification) return errorResponse(401, "Incorrect OTP");

    let difference =
      (new Date().getTime() - verification.updatedAt.getTime()) / 1000 / 60;
    if (difference > 5) return errorResponse(422, "OTP Expired");

    await verification.deleteOne();
    const user = await User.create({ email, password });

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
