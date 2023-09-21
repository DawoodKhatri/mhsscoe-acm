import { allEvents } from "contentlayer/generated";
import EventDetails from "@/components/event/eventDetails";
import EventNotFound from "@/components/event/notFound";

const EventPage = ({ params: { eventName } }) => {
  const event = allEvents.find(
    (event) => event._raw.flattenedPath === decodeURI(eventName)
  );

  if (!event) return <EventNotFound />;

  return <EventDetails title={event.title} bodyCode={event.body.code} />;

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
};

export default EventPage;
