"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import EventCard from "@/components/events/eventCard";
import { Input, Col, Empty, Row } from "antd";
// import { EVENTS } from "@/constants/data";
import Link from "next/link";

// mdx imports here :)
// import { allEvents } from ".contentlayer/generated";

import { useQuery } from "react-query";
import EventService from "@/services/event";
import { useState } from "react";

const EventsPage = () => {
  const eventQuery = useQuery("events", async () => {
    return EventService.getAllEvents();
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, error, data: { events = [] } = {} } = eventQuery;

  // Sorting posts by date 😊
  // const events = allEvents.sort(
  //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  // );

  return (
    <>
      <Glassmorphism className="relative">
        <img
          className="w-full h-44 md:h-96 object-cover align-middle opacity-50"
          src="/images/EventsBanner.jpg"
        />
        <div className="absolute bg-primary top-0 h-full w-full bg-opacity-40 flex justify-center items-center">
          <h2 className="text-6xl md:text-7xl font-bold italic text-left text-white">
            Our Events
          </h2>
        </div>
      </Glassmorphism>

      {/* <Row className="max-w-screen-xl mx-auto my-6">
        {events.map((event, index) => (
          <Col
            key={`events_page_event_${index}`}
            span={24}
            sm={{ span: 12 }}
            md={{ span: 8 }}
          >
            <Link href={`/events/${event.title}`}>
              <EventCard {...event} />
            </Link>
          </Col>
        ))}
      </Row> */}

      <div className="m-5 pb-10">
        <Glassmorphism className="mb-5">
          <Row className="m-3 gap-5" justify="space-between">
            <Col flex={1}></Col>
            <Col>
              <Input.Search
                size="large"
                placeholder="Search Events"
                onChange={({ target: { value: query } }) =>
                  setSearchQuery(query)
                }
              />
            </Col>
          </Row>
        </Glassmorphism>

        {events.filter(({ title }) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length !== 0 ? (
          <Row gutter={[40, 40]}>
            {events
              .filter(({ title }) =>
                title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((eventDetails, index) => (
                <Col
                  key={`admin_events_page_event_item_${index}`}
                  span={24}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 6 }}
                >
                  <EventCard {...eventDetails} />
                </Col>
              ))}
          </Row>
        ) : (
          <Glassmorphism className="h-44 md:h-96 flex justify-center items-center">
            <Empty description="No Events Found" />
          </Glassmorphism>
        )}
      </div>
    </>
  );
};

export default EventsPage;
