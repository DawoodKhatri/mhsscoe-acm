"use client";

import { Button, Card } from "antd";
import Glassmorphism from "../common/glassmorphism";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;

const EventCard = ({
  _id,
  title,
  description,
  thumbnail,
  allowEditDelete,
  onDelete,
}) => {
  return (
    <Glassmorphism className="hover:scale-[1.03] transition-all duration-300">
      <Link href={`/events/${_id}`}>
        <Card
          className="!bg-transparent border-none"
          hoverable
          cover={
            <img
              loading="lazy"
              alt="image"
              src={`/api/file/${thumbnail}`}
              className="w-full aspect-[4/3] object-cover"
            />
          }
        >
          <Meta
            className="!text-white"
            title={title}
            description={
              <p className="text-ellipsis line-clamp-2 h-100 min-h-[44px]">
                {description}
              </p>
            }
          />

          {allowEditDelete && (
            <div className="flex items-center justify-between mt-3">
              <Link href={`/admin/events/${_id}`}>
                <Button type="primary" icon={<EditOutlined />}>
                  Edit
                </Button>
              </Link>

              {onDelete && (
                <Button
                  className="!bg-red-500 hover:!bg-red-400"
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(_id);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </Card>
      </Link>
    </Glassmorphism>
  );
};

export default EventCard;
