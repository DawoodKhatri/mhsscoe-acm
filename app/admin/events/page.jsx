"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import EventCard from "@/components/events/eventCard";
import EventService from "@/services/event";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Input, Row, message as showMessage } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "react-query";

const AdminEventsPage = () => {
  const router = useRouter();
  const eventQuery = useQuery("events", async () => {
    return EventService.getAllEvents();
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, error, data: eventQueryData } = eventQuery;

  const deleteEvent = (eventId) => {
    EventService.deleteEvent(eventId)
      .then((message) => {
        showMessage.success(message);
        eventQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="mx-3 h-full pb-10">
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
            <Link href="/admin/events/create">
              <Button icon={<PlusOutlined />} size="large">
                Create
              </Button>
            </Link>
          </Col>
        </Row>
      </Glassmorphism>

      {eventQueryData?.events?.filter(({ title }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase())
      ).length !== 0 ? (
        <Row gutter={[40, 40]}>
          {eventQueryData?.events
            ?.filter(({ title }) =>
              title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((eventDetails, index) => (
              <Col
                key={`admin_events_page_event_item_${index}`}
                span={24}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <EventCard
                  allowEditDelete
                  onDelete={deleteEvent}
                  {...eventDetails}
                />
              </Col>
            ))}
        </Row>
      ) : (
        <Glassmorphism className="h-[calc(100%-84px)] flex justify-center items-center">
          <Empty description="No Events Found">
            <Link href="/admin/events/create">
              <Button type="primary" icon={<PlusOutlined />}>
                Create New Event
              </Button>
            </Link>
          </Empty>
        </Glassmorphism>
      )}
    </div>
  );
};

export default AdminEventsPage;
