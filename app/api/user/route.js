import { connectDB } from "@/config/database";
import { HTTP_METHODS } from "@/constants/httpMethods";
import { ROLES } from "@/constants/roles";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { uploadFile } from "@/utils/cloudinaryStorage";
import httpRequest from "@/utils/httpRequest";
import { sendVerificationMail } from "@/utils/mail";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { generateEmailToken } from "@/utils/verification";

export const POST = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER_PROFILE].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    let body = Object.fromEntries(await req.formData());
    const { profilePicture, name, email, rollno, branch, year, membershipId } =
      body;

    if (!name || !email || !rollno || !branch || !year)
      return errorResponse(400, "Please fill all the fields");

    let targetUser = await User.findOne({ email });
    if (targetUser) return errorResponse(409, "User already Exists");

    await httpRequest(
      "/api/user/auth/registration/verification",
      HTTP_METHODS.POST,
      { email }
    );

    targetUser = await User.create({ name, email, rollno, branch, year });

    if (membershipId) targetUser.membershipId = membershipId;

    if (profilePicture) {
      const profilePicturePath = await uploadFile(
        await profilePicture.arrayBuffer(),
        "Profile Pictures",
        `${targetUser._id}-${Date.now()}`,
        profilePicture.type
      );

      targetUser.profilePicture = profilePicturePath;
    }

    await targetUser.save();

    const token = generateEmailToken(email);
    const confirmation_link = `${process.env.CLIENT_URL}/register/${token}`;
    await sendVerificationMail(name, email, confirmation_link, "registration");

    return successResponse(
      200,
      "User Created & Registration Link sent successfully",
      {
        newUserId: targetUser._id,
      }
    );
  } catch (error) {
    return errorResponse();
  }
};
