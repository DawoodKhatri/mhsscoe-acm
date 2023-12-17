"use client";
import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { POST_LEVELS } from "@/constants/postLevels";

const TeamSectionsPostCard = ({ title, level, user }) => {
  return (
    <>
      <Glassmorphism className="flex flex-col aspect-[2/3] lg:aspect-[3/4] [&>div:first-child]:hover:flex-[4] hover:!scale-105 transition-all duration-300">
        <div className="w-full flex-[5] overflow-hidden transition-all duration-300">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={`/api/file/${
              user.profilePicture ?? "Profile%20Pictures/default"
            }`}
          />
        </div>
        <div className="flex-[2] sm:flex-[1] p-3 flex flex-col justify-center items-center transition-all duration-300">
          <p
            className="font-semibold text-center text-gray-700 text-sm sm:text-base md:text-lg text-ellipsis line-clamp-1 break-all"
            title={user.name}
          >
            {user.name}
          </p>
          <div className="flex gap-3 justify-center items-center">
            {POST_LEVELS.find(({ value }) => value === level).label}
            <p className="italic text-gray-500 text-sm sm:text-base">{title}</p>
          </div>
        </div>
      </Glassmorphism>
    </>
  );
};

export default TeamSectionsPostCard;
