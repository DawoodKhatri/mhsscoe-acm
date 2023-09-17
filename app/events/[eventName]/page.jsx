import { EVENTS } from "@/constants/data";
import { Col, Row } from "antd";
import React from "react";

const EventPage = ({ params: { eventName } }) => {
  const EVENT_DETAILS = EVENTS[eventName];

  return (
    <>
      <div className="relative mb-16">
        <img
          className="w-full h-96 object-cover align-middle"
          src="/images/EventsBanner.jpg"
        />
        <div className="absolute bg-blue-600 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
          <h2 className="text-7xl font-bold text-left text-white">
            {EVENT_DETAILS.title}
          </h2>
        </div>
      </div>

      <Row justify="center">
        <Col
          className="px-8 sm:px-16 md:px-24"
          span={24}
          sm={{ span: 22 }}
          md={{ span: 20 }}
          lg={{ span: 18 }}
        >
          {EVENT_DETAILS.contents.map(({ type, image, description, text }) => (
            <>
              {type === "image" && (
                <div className="relative rounded-lg overflow-hidden">
                  <img src={image} />
                  <div className="absolute top-0 w-full h-full flex justify-center items-end bg-gradient-to-b from-transparent to-black  opacity-0 hover:opacity-100 transition-all duration-300">
                    <p className="text-xl m-5 italic text-center text-white">
                      {description}
                    </p>
                  </div>
                </div>
              )}

              {type === "text" && <p className="text-xl m-5">{text}</p>}
            </>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default EventPage;
