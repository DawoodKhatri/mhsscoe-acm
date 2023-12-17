"use client";
import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { POST_LEVELS } from "@/constants/postLevels";

const TeamSectionsPostCard = ({ title, level, user }) => {
  return (
    <Glassmorphism className="aspect-[6/8] hover:!scale-105 [&>img]:hover:h-[65%] [&>div]:hover:h-[35%] [&>div>p]:hover:text-lg transition-all duration-300">
      <img
        className="w-full h-[75%] object-cover rounded-lg transition-all duration-300"
        src={`/api/file/${user.profilePicture ?? "Profile%20Pictures/default"}`}
      />
      <div className="h-[25%] w-full p-5 flex flex-col justify-center items-center transition-all duration-300">
        <p
          className="font-semibold text-center text-gray-700  text-ellipsis line-clamp-1 break-all transition-all duration-300"
          title={user.name}
        >
          {user.name}
        </p>
        <div className="flex gap-3 justify-center items-center">
          {POST_LEVELS.find(({ value }) => value === level).label}
          <p className="md:text-base italic text-gray-500">{title}</p>
        </div>
      </div>
    </Glassmorphism>
  );
};

export default TeamSectionsPostCard;
