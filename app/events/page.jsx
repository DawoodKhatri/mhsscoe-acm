import Glassmorphism from "@/components/common/glassmorphism";
import EventCard from "@/components/events/eventCard";
import { Col, Row } from "antd";
import { EVENTS } from "@/constants/data";
import Link from "next/link";

const EventsPage = () => {
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

      <Row className="max-w-screen-xl mx-auto my-6">
        {EVENTS.map((event, index) => (
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
      </Row>
    </>
  );
};

export default EventsPage;
