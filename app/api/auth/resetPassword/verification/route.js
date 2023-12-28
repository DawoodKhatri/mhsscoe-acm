import { errorResponse, successResponse } from "@/utils/sendResponse";
import { generatePasswordToken } from "@/utils/verification";
import { sendVerificationMail } from "@/utils/mail";
import User from "@/models/user";
import { connectDB } from "@/config/database";

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    if (!email) return errorResponse(400, "Please enter email address");

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return errorResponse(404, "Account not found");

    const { name } = email.split(".")[0];
    const token = generatePasswordToken(email);
    const confirmation_link = `${process.env.CLIENT_URL}/resetPassword/${token}`;

    await sendVerificationMail(name, email, confirmation_link, "resetPassword");

    return successResponse(200, "Password Reset link sent");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
