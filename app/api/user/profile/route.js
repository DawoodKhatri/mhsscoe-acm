import { connectDB } from "@/config/database";
import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { getUrl, upload } from "@/utils/firebaseStorage";
import resizeImage from "@/utils/resizeImage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");

    if (user.profilePicture)
      user.profilePicture = await getUrl(user.profilePicture);

    return successResponse(200, "Profile Details", user);
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req) => {
  try {
    let body = Object.fromEntries(await req.formData());
    const { profilePicture } = body;
    Object.keys(body).forEach(
      (key) => key !== "profilePicture" && (body[key] = JSON.parse(body[key]))
    );
    const { name, email, rollno, branch, year, links } = body;

    if (!name || !email || !rollno || !branch || !year)
      return errorResponse(400, "Please fill all the fields");

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return errorResponse(404, "Account not found");

    if (!user.profilePicture && !profilePicture) {
      return errorResponse(400, "Please fill all the fields");
    } else if (profilePicture) {
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
    }

    user.name = name;
    user.rollno = rollno;
    user.branch = branch;
    user.year = year;
    user.links = links;

    await user.save();

    return successResponse(200, "Profile updated successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
