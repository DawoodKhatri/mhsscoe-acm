import EventNotFound from "@/components/event/notFound";
// import { EVENT_DATA } from "@/constants/data";

// mdx imports here :)
import { allEvents } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXImage from "@/components/event/mdxImage";

const EventPage = ({ params: { eventName } }) => {
  const event = allEvents.find(
    (event) => event._raw.flattenedPath === eventName
  );

  // if (!event) return <EventNotFound />;
  const MDXContent = useMDXComponent(event.body.code);

  const contents = {
    MDXImage,
  };

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={event.date} className="mb-1 text-xs text-gray-600">
          {/* indian date time format */}

          {new Intl.DateTimeFormat("en-IN").format(new Date(event.date))}
        </time>
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="prose text-left">
          <MDXContent components={contents} />
        </div>
      </div>
    </article>
  );
};

export default EventPage;
