import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Col, Row } from "antd";

const EventDetails = ({ details }) => {
  const {
    start_date,
    end_date,
    registration_end_date,
    entry_fees_members,
    entry_fees_others,
  } = details.info;
  return (
    <>
      <Glassmorphism className="mb-8 p-8 pt-2 md:m-5">
        <h2
          className={`text-5xl pt-3 md:text-7xl md:pt-0 font-bold italic text-center text-primary-dark`}
        >
          {details?.title}
        </h2>
      </Glassmorphism>

      <Row justify="center" className="sm:px-8 md:px-16">
        <Col
          className="lg:pr-8"
          span={24}
          order={1}
          sm={{ span: 22 }}
          md={{ span: 20 }}
          lg={{ span: 16, order: 0 }}
        >
          {details?.contents.map(
            ({ type, image, description, text }, index) => (
              <div key={`event_page_content_${index}`}>
                {type === "image" && (
                  <Glassmorphism className="relative overflow-hidden">
                    <img className="opacity-80 w-full" src={image} />
                    <div
                      className={`absolute top-0 w-full h-full flex justify-center items-end bg-gradient-to-b from-transparent to-primary-dark  opacity-0 hover:opacity-100 transition-all duration-300`}
                    >
                      <p className="text-xl m-5 italic text-center text-white">
                        {description}
                      </p>
                    </div>
                  </Glassmorphism>
                )}

                {type === "text" && (
                  <Glassmorphism className="my-5">
                    <p className="text-xl m-5">{text}</p>
                  </Glassmorphism>
                )}
              </div>
            )
          )}
        </Col>
        <Col
          className="lg:pl-8 pb-5 lg:pb-0"
          span={24}
          order={0}
          sm={{ span: 22 }}
          md={{ span: 20 }}
          lg={{ span: 8, order: 1 }}
        >
          <Glassmorphism className={`p-5 text-lg text-primary-dark`}>
            <p className="my-2">
              <span className={`font-semibold`}>Event Starts: </span>
              <i>{start_date.toDateString()}</i>
            </p>

            <p className="my-2">
              <span className="font-semibold">Event Ends: </span>
              {end_date.toDateString()}
            </p>

            <p className="my-2">
              <span className="font-semibold">Registration Ends: </span>
              {registration_end_date.toDateString()}
            </p>

            <p className="my-2">
              <span className="font-semibold">Entry Fees for Members: </span>
              {entry_fees_members ? "₹" + entry_fees_members : "Free"}
            </p>

            <p className="my-2">
              <span className="font-semibold">Entry Fees for Others: </span>₹
              {entry_fees_others}
            </p>
          </Glassmorphism>
        </Col>
      </Row>
    </>
  );
};

export default EventDetails;
