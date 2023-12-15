import React from "react";
import Glassmorphism from "../common/glassmorphism";

const TeamSectionsPostCard = ({ title, level, user }) => {
  return (
    <Glassmorphism className="hover:scale-[1.03] transition-all duration-300">
      <img
        className="aspect-square object-cover"
        src={`/api/file/${user.profilePicture ?? "Profile%20Pictures/default"}`}
      />
      <div className="p-5">
        <p className="font-semibold text-center text-gray-700">{user.name}</p>
        <div className="flex gap-3 justify-center items-center">
          {/* {POST_LEVELS.find(({ value }) => value === level).label} */}
          <p className="md:text-base italic text-gray-500">{title}</p>
        </div>
      </div>
      {/* <Card
        className="!bg-transparent border-none"
        hoverable
        cover={
         
        }
      >
        <Card.Meta
          className="text-center"
          title={user.name}
          description={
          
          }
        />
      </Card> */}
    </Glassmorphism>
  );
};

export default TeamSectionsPostCard;
