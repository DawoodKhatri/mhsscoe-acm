"use client";

import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const EventCard = ({
  _id,
  title,
  description,
  poster,
  allowEditDelete,
  onDelete,
  left = true,
}) => {
  return (
    <div data-aos="fade-up">
      <div className="rounded-lg overflow-hidden shadow-sm hover:!scale-105 hover:shadow-lg transition-all duration-300 [&_.event-card-banner]:hover:flex-[3] [&_.event-card-info>h1]:hover:text-3xl [&_.event-card-info>p]:hover:line-clamp-3">
        <div
          className={`relative ${
            allowEditDelete ? "aspect-[3/4]" : "aspect-square"
          } rounded-lg overflow-hidden`}
        >
          <div className="absolute top-0 w-full h-full">
            <img
              className="w-full h-full object-cover blur-lg"
              src={`${process.env.CLIENT_URL ?? ""}/api/file/${poster}`}
            />
          </div>
          <div className="relative w-full h-full flex flex-col gap-3 p-3">
            <div className="event-card-banner w-full flex-[6] overflow-hidden transition-all duration-300">
              <img
                className="mx-auto h-full object-contain rounded-lg"
                src={`${process.env.CLIENT_URL ?? ""}/api/file/${poster}`}
              />
            </div>
            <div className="event-card-info w-full flex-[2] rounded-lg bg-white py-2 px-5 flex flex-col justify-center items-center">
              <h1
                className="text-gray-700 text-left text-2xl font-bold text-ellipsis line-clamp-1"
                title={title}
              >
                {title}
              </h1>
              <p className="text-gray-500 text-left text-ellipsis line-clamp-2 h-100 min-h-[44px]">
                {description}
              </p>
            </div>
            {allowEditDelete && (
              <div className="w-full flex-[1] flex items-center justify-between">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
