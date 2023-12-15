import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { ROLES } from "@/constants/roles";
import { Card } from "antd";

const UserRoleCard = ({ profilePicture, name, branch, year, role }) => {
  return (
    <Glassmorphism className="hover:scale-[1.03] transition-all duration-300">
      <Card
        className="!bg-transparent border-none"
        hoverable
        cover={
          <img
            className="aspect-square object-cover"
            src={`/api/file/${profilePicture ?? "Profile%20Pictures/default"}`}
          />
        }
      >
        <Card.Meta
          className="text-center"
          title={name}
          description={
            <p className="italic">
              {Object.keys(ROLES)[Object.values(ROLES).indexOf(role)].replace(
                "_",
                " "
              )}
            </p>
          }
        />
      </Card>
    </Glassmorphism>
  );
};

export default UserRoleCard;
