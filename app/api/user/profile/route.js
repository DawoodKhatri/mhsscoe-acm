import { connectDB } from "@/config/database";
import User from "@/models/user";
import { upload } from "@/utils/firebaseStorage";
import resizeImage from "@/utils/resizeImage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const POST = async (req) => {
  try {
    const { profilePicture, name, email, rollno, branch, year } =
      Object.fromEntries(await req.formData());

    if (!profilePicture || !name || !email || !rollno || !branch || !year)
      return errorResponse(400, "Please fill all the fields");

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return errorResponse(404, "Account not found");

    const profilePictureBuffer = await resizeImage(
      await profilePicture.arrayBuffer()
    );

    const profilePicturePath = await upload(
      "Profile-Pictures",
      `${user._id}.jpg`,
      profilePictureBuffer,
      profilePicture.type
    );

    user.profilePicture = profilePicturePath;
    user.name = name;
    user.rollno = rollno;
    user.branch = branch;
    user.year = year;

    await user.save();

    return successResponse(200, "Profile updated successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
