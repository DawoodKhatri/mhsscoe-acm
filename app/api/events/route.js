import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import Event from "@/models/event";
import User from "@/models/user";
import checkAuth from "@/utils/checkAuth";
import { uploadFile } from "@/utils/cloudinaryStorage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    await connectDB();

    let events = await Event.find({}).select("title description poster");

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
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    const body = Object.fromEntries(await req.formData());
    const {
      title,
      description,
      poster,
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
      !poster ||
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

    const posterPath = await uploadFile(
      Buffer.from(await poster.arrayBuffer()),
      "Event Posters",
      `${event._id}-${Date.now()}`
    );

    event.poster = posterPath;

    await event.save();

    return successResponse(200, "Event Created successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
