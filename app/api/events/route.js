import { connectDB } from "@/config/database";
import Event from "@/models/event";
import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { upload, getUrl } from "@/utils/firebaseStorage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    await connectDB();

    let events = await Event.find({}).select("title description thumbnail");

    return successResponse(200, "All Event", { events });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const POST = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (!user.isAdmin) return errorResponse(403, "Unauthorized Access");

    const body = Object.fromEntries(await req.formData());
    const {
      title,
      description,
      thumbnail,
      startDate,
      endDate,
      registrationEndDate,
      entryFees,
      membersEntryFees,
      blog,
    } = body;

    if (
      !title ||
      !description ||
      !thumbnail ||
      !startDate ||
      !endDate ||
      !registrationEndDate ||
      !entryFees ||
      !membersEntryFees ||
      !blog
    )
      return errorResponse(400, "Please fill all the fields");

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      registrationEndDate,
      entryFees,
      membersEntryFees,
      blog,
    });

    const thumbnailPath = await upload(
      "Event-Thumbnails",
      `${event._id}.jpg`,
      await thumbnail.arrayBuffer(),
      thumbnail.type
    );

    event.thumbnail = thumbnailPath;

    await event.save();

    return successResponse(200, "Event Created successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
