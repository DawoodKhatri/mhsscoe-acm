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
    <div
      className="rounded-lg overflow-hidden shadow-sm hover:scale-[1.01] hover:shadow-lg transition-all duration-300"
      data-aos="fade-up"
    >
      {/* <Card
          className="!bg-transparent border-none"
          hoverable
          cover={
            <img
              loading="lazy"
              alt="image"
              src={`/api/file/${poster}`}
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
        </Card> */}

      {/* <div
          className="relative w-full flex"
          data-aos={left ? "fade-right" : "fade-left"}
        >
          {left && (
            <Image
              src={`/api/file/${poster}`}
              alt="image"
              width={300}
              height={300}
              className="rounded-md w-[30rem] h-64 object-left-top object-cover"
            />
          )}

          <div className="bg-white w-full p-5">
            <h1 className="text-black text-left text-2xl font-bold">{title}</h1>
            <p className="text-gray-500 text-left text-ellipsis line-clamp-2 h-100 min-h-[44px]">
              {description}
            </p>
          </div>

          {!left && (
            <Image
              src={`/api/file/${poster}`}
              alt="image"
              width={300}
              height={300}
              className="rounded-md w-[30rem] h-64 object-left-top object-cover"
            />
          )}

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
        </div> */}
      <div
        className={`relative ${
          allowEditDelete ? "aspect-[3/4]" : "aspect-square"
        } rounded-lg overflow-hidden`}
      >
        <div className="absolute top-0 w-full h-full">
          <img
            className="w-full h-full object-cover blur-lg"
            src={`/api/file/${poster}`}
          />
        </div>
        <div className="relative w-full h-full flex flex-col gap-3 p-3">
          <div className="w-full flex-[6] overflow-hidden">
            <img
              className="mx-auto h-full object-contain rounded-lg"
              src={`/api/file/${poster}`}
            />
          </div>
          <div className="w-full flex-[2] rounded-lg bg-white py-2 px-5 flex flex-col justify-center items-center">
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
  );
};

export default EventCard;
