"use server";
import { connectDB } from "@/config/database";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { cookies } from "next/headers";

export const getAuthStatus = async () => {
  try {
    const userId = await checkAuth(cookies());
    if (!userId)
      return {
        success: true,
        message: "Auth Status",
        data: { isLoggedIn: false },
      };

    await connectDB();

    let user = await User.findById(userId);

    if (!user)
      return {
        success: true,
        message: "Auth Status",
        data: { isLoggedIn: false },
      };

    return {
      success: true,
      message: "Auth Status",
      data: {
        isLoggedIn: true,
        profilePicture: user.profilePicture,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
