import EventCard from "@/components/events/eventCard";
import { Col, Row } from "antd";
import React from "react";

const EventsPage = () => {
  const EVENTS = [
    {
      title: "Inauguration Ceremony",
      image:
        "https://www.mhsscoe.hosting.acm.org/demo/wp-content/uploads/2023/06/4.jpg",
      description:
        "MHSSCOE conducted the Inaugural session of ACM chapter 2022-2023. The ceremony began  with the recitation",
    },
    {
      title: "DSA to Crack MAANG Interviews",
      image:
        "https://www.mhsscoe.hosting.acm.org/demo/wp-content/uploads/2023/06/IMG_7365-min-1152x1536.jpg",
      description:
        "The workshop on ‘Data Structures and Algorithms to crack MAANG Interviews’ was organized by",
    },
    {
      title: "Teacher’s Day Celebration",
      image:
        "https://www.mhsscoe.hosting.acm.org/demo/wp-content/uploads/2023/06/8.jpg",
      description:
        "The teachers after a long and felicitous inaugural ceremony, were all gathered in the CC",
    },
    {
      title: "Code Loop",
      image:
        "https://www.mhsscoe.hosting.acm.org/demo/wp-content/uploads/2023/06/2-1.jpg",
      description:
        "ACM Chapter 2022 organized a Coding Competition in our college, MHSSCE on the 22nd of",
    },
    {
      title: "90 Seconds to Fame",
      image:
        "https://www.mhsscoe.hosting.acm.org/demo/wp-content/uploads/2023/06/5-1.jpg",
      description:
        "Commencing at 11am, the venue was filled with crowds of people excited to watch the",
    },
    {
      title: "Heart of Art",
      image:
        "https://www.mhsscoe.hosting.acm.org/demo/wp-content/uploads/2023/06/12-1536x1152.jpg",
      description:
        "HEART OF ART is an event organized by the ACM COMMITTEE. It was a creative",
    },
  ];

  return (
    <>
      <div className="relative">
        <img
          className="w-full h-96 object-cover align-middle"
          src="/images/EventsBanner.jpg"
        />
        <div className="absolute bg-blue-600 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
          <h2 className="text-7xl font-bold text-left text-white">
            Our Events
          </h2>
        </div>
      </div>

      <Row className="max-w-screen-xl mx-auto my-6">
        {EVENTS.map((event,index) => (
          <Col key={`events_page_event_${index}`} span={24} sm={{ span: 12 }} md={{ span: 8 }}>
            <EventCard {...event} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default EventsPage;
