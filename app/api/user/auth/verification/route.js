import { errorResponse, successResponse } from "@/utils/sendResponse";
import { connectDB } from "@/config/database";
import User from "@/models/user";
import { generateOTP } from "@/utils/verification";
import Verification from "@/models/verification";
import { sendVerificationMail } from "@/utils/mail";

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    if (!email) return errorResponse(400, "Please enter email address");
    console.log(email);
    await connectDB();

    const user = await User.findOne({ email });
    if (user) return errorResponse(409, "Email already taken");

    const otp = generateOTP();
    await sendVerificationMail(email, String(otp));

    let verification = await Verification.findOne({ email });
    if (!verification) {
      verification = await Verification.create({ email, otp });
    } else {
      verification = await Verification.findOneAndUpdate(
        { email },
        { $set: { otp } }
      );
    }

    return successResponse(200, "Verification mail sent");
  } catch (error) {
    return errorResponse(500, error.message.toString());
  }
};
