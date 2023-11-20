"use client";

import EventCard from "@/components/events/eventCard";
import { Input, Col, Empty, Row } from "antd";
import Link from "next/link";
import { useQuery } from "react-query";
import EventService from "@/services/event";
import { useEffect, useState } from "react";

const EventsPage = () => {
  const eventQuery = useQuery("events", async () => {
    return EventService.getAllEvents();
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, error, data: { events = [] } = {} } = eventQuery;

  return (
    <>
      <div className="text-gray-700 py-10 text-center">
        <h2 className="text-7xl font-bold">Our Events</h2>
      </div>

      <div className="m-5 pb-10">
        <div className="mb-5">
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
        </div>

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
                  lg={{ span: 24 }}
                >
                  <div className="rounded-md shadow-md">
                    <Link href={`/events/${eventDetails._id}`}>
                      <EventCard {...eventDetails} left={index % 2 == 0} />
                    </Link>
                  </div>
                </Col>
              ))}
          </Row>
        ) : (
          <div className="h-44 md:h-96 flex justify-center items-center bg-white rounded-md shadow-md">
            <Empty description="No Events Found" />
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;
