"use client";

import { Button, Card } from "antd";

const { Meta } = Card;

const EventCard = ({ title, image, description }) => {
  return (
    <Card
      className="m-5 hover:scale-95 transition-all duration-300"
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
        title={title}
        description={
          <p className="text-ellipsis line-clamp-2">{description}</p>
        }
      />
      <div className="flex items-center justify-end mt-3">
        <Button>Attend</Button>
      </div>
    </Card>
  );
};

export default EventCard;
