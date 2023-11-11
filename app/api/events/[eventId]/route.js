import { connectDB } from "@/config/database";
import Event from "@/models/event";
import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { upload } from "@/utils/firebaseStorage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req, { params: { eventId } }) => {
  try {
    await connectDB();

    const event = await Event.findById(eventId);
    if (!event) return errorResponse(404, "Event not found");

    return successResponse(200, "All Event", { event });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req, { params: { eventId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (!user.isAdmin) return errorResponse(403, "Unauthorized Access");

    const event = await Event.findById(eventId);
    if (!event) return errorResponse(404, "Event not found");

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
      !startDate ||
      !endDate ||
      !registrationEndDate ||
      !entryFees ||
      !membersEntryFees ||
      !blog
    )
      return errorResponse(400, "Please fill all the fields");

    let thumbnailPath;
    if (thumbnail) {
      thumbnailPath = await upload(
        "Event-Thumbnails",
        `${eventId}.jpg`,
        await thumbnail.arrayBuffer(),
        thumbnail.type
      );
    }

    await Event.findByIdAndUpdate(eventId, {
      title,
      description,
      startDate,
      endDate,
      registrationEndDate,
      entryFees,
      membersEntryFees,
      blog,
      ...(thumbnail ? { thumbnail: thumbnailPath } : {}),
    });

    return successResponse(200, "Event Updated successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
