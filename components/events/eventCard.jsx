"use client";

import { Button, Card } from "antd";
import Glassmorphism from "../common/glassmorphism";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const { Meta } = Card;

const EventCard = ({
  _id,
  title,
  description,
  thumbnail,
  allowEditDelete,
  onDelete,
  left = true,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    console.log("AOS.init");
  }, []);

  return (
    <div className="hover:scale-[1.01] hover:shadow-sm transition-all duration-300">
      <Link href={`/events/${_id}`}>
        {/* <Card
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
        </Card> */}

        <div
          className="relative w-full flex"
          data-aos={left ? "fade-right" : "fade-left"}
        >
          {left && (
            <Image
              src={`/api/file/${thumbnail}`}
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
              src={`/api/file/${thumbnail}`}
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
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
