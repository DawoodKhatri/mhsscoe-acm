// import { allEvents } from "contentlayer/generated";
// import EventDetails from "@/components/event/eventDetails";
// import EventNotFound from "@/components/event/notFound";

"use client";
import EventService from "@/services/event";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Col, Grid, Row, message as showMessage } from "antd";
import { useRouter } from "next/navigation";
import EventHeader from "@/components/events/eventHeader";
import EventBlog from "@/components/events/eventsBlog";
import EventDetails from "@/components/events/eventDetails";

const EventPage = ({ params: { eventId } }) => {
  // const event = allEvents.find(
  //   (event) => event._raw.flattenedPath === decodeURI(eventName)
  // );

  // if (!event) return <EventNotFound />;

  // return <EventDetails title={event.title} bodyCode={event.body.code} />;

  // return (
  //   <article className="mx-auto max-w-xl py-8">
  //     <div className="mb-8 text-center">
  //       <time dateTime={event.date} className="mb-1 text-xs text-gray-600">
  //         {/* indian date time format */}

  //         {new Intl.DateTimeFormat("en-IN").format(new Date(event.date))}
  //       </time>
  //       <h1 className="text-3xl font-bold">{event.title}</h1>
  //       <div className="prose text-left">
  //         <MDXContent components={contents} />
  //       </div>
  //     </div>
  //   </article>
  // );

  const router = useRouter();
  const eventQuery = useQuery(
    "events",
    async () => {
      return EventService.getEventDetails(eventId);
    },
    { retry: false }
  );

  const {
    isLoading,
    error: eventQueryError,
    data: { event = {} } = {},
  } = eventQuery;

  useEffect(() => {
    if (eventQueryError) {
      showMessage.error(eventQueryError);
      router.replace("/not-found");
    }
  }, [eventQueryError]);

  const { md } = Grid.useBreakpoint();

  return (
    <>
      <Row
        className="m-5 pb-10 relative"
        gutter={[20, 20]}
        justify="space-evenly"
      >
        <Col span={24} md={{ span: 16 }} lg={{ span: 12 }}>
          <EventHeader {...event} />
          {md && (
            <div className="mt-5">
              <EventBlog blog={event?.blog} />
            </div>
          )}
        </Col>

        <Col span={24} md={{ span: 8 }}>
          <EventDetails {...event} />
        </Col>
        {!md && (
          <Col span={24}>
            <EventBlog blog={event?.blog} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default EventPage;
