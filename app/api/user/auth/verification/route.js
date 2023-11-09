import { errorResponse, successResponse } from "@/utils/sendResponse";
import { generateEmailToken } from "@/utils/verification";
import { sendVerificationMail } from "@/utils/mail";

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    if (!email) return errorResponse(400, "Please enter email address");

    const { name } = email.split(".")[0];
    const token = generateEmailToken(email);
    const confirmation_link = `${process.env.CLIENT_URL}/register/${token}`;

    await sendVerificationMail(name, email, confirmation_link);

    return successResponse(200, "Verification mail sent");
  } catch (error) {
    return errorResponse(500, error.message.toString());
  }
};
