import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { POST_LEVELS } from "@/constants/postLevels";
import { Card } from "antd";

const TeamSectionsPostCard = ({ title, level, user }) => {
  return (
    <Glassmorphism className="hover:scale-[1.03] transition-all duration-300">
      <Card
        className="!bg-transparent border-none"
        hoverable
        cover={
          <img
            className="aspect-square object-cover"
            src={`/api/file/${user.profilePicture}`}
          />
        }
      >
        <Card.Meta
          className="text-center"
          title={user.name}
          description={
            <div className="flex gap-3 justify-center items-center">
              {POST_LEVELS.find(({ value }) => value === level).label}
              <p className="md:text-base italic">{title}</p>
            </div>
          }
        />
      </Card>
    </Glassmorphism>
  );
};

export default TeamSectionsPostCard;
