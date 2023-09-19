"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { colorPrimaryDark } from "@/constants/colors";
import { EVENT_DATA } from "@/constants/data";
import { Col, Row } from "antd";
import useToken from "antd/es/theme/useToken";
import React from "react";

const EventPage = ({ params: { eventName } }) => {
  const EVENT_DETAILS = EVENT_DATA.filter(
    ({ title }) => title === decodeURI(eventName)
  )[0];

  return (
    <>
      {!EVENT_DETAILS ? (
        <Glassmorphism className="h-[calc(100vh-126px)] flex flex-col justify-center items-center gap-6">
          <img className="max-w-sm w-full" src="/images/void.png" />
          <h2
            className={`font-bold text-3xl sm:text-4xl md:text-5xl text-[${colorPrimaryDark}]`}
          >
            Event Not Found
          </h2>
        </Glassmorphism>
      ) : (
        <>
          <Glassmorphism className="mb-8 p-8 pt-2 md:m-5">
            <h2
              className={`text-6xl md:text-7xl font-bold italic text-center text-[${colorPrimaryDark}]`}
            >
              {EVENT_DETAILS?.title}
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
              {EVENT_DETAILS?.contents.map(
                ({ type, image, description, text }, index) => (
                  <div key={`event_page_content_${index}`}>
                    {type === "image" && (
                      <Glassmorphism className="relative overflow-hidden">
                        <img className="opacity-80 w-full" src={image} />
                        <div
                          className={`absolute top-0 w-full h-full flex justify-center items-end bg-gradient-to-b from-transparent to-[${colorPrimaryDark}]  opacity-0 hover:opacity-100 transition-all duration-300`}
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
              <Glassmorphism
                className={`p-5 text-lg text-[${colorPrimaryDark}]`}
              >
                <p className="my-2">
                  <span className={`font-semibold text-[${colorPrimaryDark}]`}>
                    Event Starts:{" "}
                  </span>
                  <i>{EVENT_DETAILS.details.start_date.toDateString()}</i>
                </p>

                <p className="my-2">
                  <span className="font-semibold">Event Ends: </span>
                  {EVENT_DETAILS.details.end_date.toDateString()}
                </p>

                <p className="my-2">
                  <span className="font-semibold">Registration Ends: </span>
                  {EVENT_DETAILS.details.registration_end_date.toDateString()}
                </p>

                <p className="my-2">
                  <span className="font-semibold">
                    Entry Fees for Members:{" "}
                  </span>
                  {EVENT_DETAILS.details.entry_fees_members
                    ? "₹" + EVENT_DETAILS.details.entry_fees_members
                    : "Free"}
                </p>

                <p className="my-2">
                  <span className="font-semibold">Entry Fees for Others: </span>
                  ₹{EVENT_DETAILS.details.entry_fees_others}
                </p>
              </Glassmorphism>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default EventPage;
