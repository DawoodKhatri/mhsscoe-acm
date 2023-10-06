import { connectDB } from "@/config/database";
import User from "@/models/user";
import { getDetailsFromEmail } from "@/utils/detailsFromEmail";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { verifyEmailToken } from "@/utils/verification";

export const POST = async (req) => {
  try {
    const { token: emailToken, password } = await req.json();
console.log(emailToken,password);
    if (!emailToken || !password)
      return errorResponse(400, "Please fill all the fields");

    const { email } = verifyEmailToken(emailToken);
    if (!email) return errorResponse(401, "Invalid token");

    await connectDB();

    const { name, rollno, branch } = getDetailsFromEmail(email);
    const user = await User.create({ email, password, name, rollno, branch });

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
