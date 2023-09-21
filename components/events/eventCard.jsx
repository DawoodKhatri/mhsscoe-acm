"use client";

import { Button, Card } from "antd";
import Glassmorphism from "../common/glassmorphism";

const { Meta } = Card;

const EventCard = ({ title, image, description }) => {
  return (
    <Glassmorphism className="m-5 hover:scale-[1.03] transition-all duration-300">
      <Card
        className="!bg-transparent border-none"
        hoverable
        cover={
          <img
            alt="image"
            src={image}
            className="w-full aspect-[4/3] object-cover"
          />
        }
      >
        <Meta
          className="!text-white"
          title={title}
          description={
            <p className="text-ellipsis line-clamp-2 h-100 min-h-[44px]">{description}</p>
          }
        />
        <div className="flex items-center justify-end mt-3">
          <Button>Attend</Button>
        </div>
      </Card>
    </Glassmorphism>
  );
};

export default EventCard;
