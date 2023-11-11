"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import EventCard from "@/components/events/eventCard";
import EventService from "@/services/event";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const AdminEventsPage = () => {
  const eventQuery = useQuery("events", async () => {
    return EventService.getAllEvents();
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, error, data: eventQueryData } = eventQuery;

  useEffect(() => {
    console.log(eventQueryData?.events);
  }, [eventQueryData]);
  return (
    <div className="mx-3 h-full">
      <Glassmorphism className="mb-5">
        <Row className="m-3 gap-5" justify="space-between">
          <Col flex={1}></Col>
          <Col>
            <Input.Search
              size="large"
              placeholder="Search Events"
              onChange={({ target: { value: query } }) => setSearchQuery(query)}
            />
          </Col>
          <Col>
            <Button icon={<PlusOutlined />} size="large">
              Create
            </Button>
          </Col>
        </Row>
      </Glassmorphism>
      <Row gutter={[40, 40]}>
        {eventQueryData?.events
          .filter(({ title }) =>
            title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(({ title, description, thumbnail }, index) => (
            <Col
              key={`admin_events_page_event_item_${index}`}
              span={24}
              sm={{ span: 12 }}
              md={{ span: 8 }}
            >
              <EventCard
                title={title}
                description={description}
                image={`/api/file/${thumbnail}`}
              />
            </Col>
          ))}
      </Row>
      {eventQueryData?.events.filter(({ title }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <Glassmorphism className="h-[calc(100%-84px)] flex justify-center items-center">
          <Empty description="No Events Found">
            <Button type="primary" icon={<PlusOutlined />}>
              Create New Event
            </Button>
          </Empty>
        </Glassmorphism>
      )}
    </div>
  );
};

export default AdminEventsPage;
