"use server";
import { connectDB } from "@/config/database";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { deleteFile, uploadFile } from "@/utils/cloudinaryStorage";
import { cookies } from "next/headers";

export const getProfileDetails = async (userId) => {
  try {
    if (!userId) userId = await checkAuth(cookies());
    if (!userId) throw { status: 403, message: "Please login first" };

    await connectDB();

    let user = await User.findById(userId);
    if (!user) throw { status: 404, message: "Account not found" };

    user = user.toObject();
    user._id = user._id.toString();
    delete user.teams;

    return user;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

export const updateProfileDetails = async (form, userId) => {
  try {
    if (!userId) userId = await checkAuth(cookies());
    if (!userId) throw { status: 403, message: "Please login first" };

    await connectDB();

    let user = await User.findById(userId);
    if (!user) throw { status: 404, message: "Account not found" };

    let body = Object.fromEntries(form);
    const { profilePicture, name, rollno, branch, year } = body;
    const links = body.links ? JSON.parse(body.links) : undefined;

    if (!name || !rollno || !branch || !year)
      throw { status: 400, message: "Please fill all the fields" };

    if (!user.profilePicture && !profilePicture)
      throw { status: 400, message: "Please fill all the fields" };

    if (profilePicture) {
      const profilePicturePath = await uploadFile(
        await profilePicture.arrayBuffer(),
        "Profile Pictures",
        `${user._id.toString()}-${Date.now()}`,
        profilePicture.type
      );

      if (user.profilePicture) await deleteFile(user.profilePicture);

      user.profilePicture = profilePicturePath;
    }

    user.name = name;
    user.rollno = rollno;
    user.branch = branch;
    user.year = year;

    if (user.membershipId) user.links = links;

    await user.save();

    return "Profile updated successfully";
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

export const getUserDetailsByEmail = async (userEmail) => {
  try {
    await connectDB();

    let user = await User.findOne({
      email: userEmail,
    }).populate("teams.team teams.post");

    if (!user) throw { status: 404, message: "User not found" };

    user = user.toObject();
    user._id = user._id.toString();

    const teams = user.teams.map(({ team, section, post }) => ({
      year: team.year,
      section: team.sections.find(
        ({ _id: sectionId }) => section.toString() === sectionId.toString()
      ).title,
      post: post.title,
      level: post.level,
    }));

    const userDetails = { ...user, teams };

    return userDetails;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};
