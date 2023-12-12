import EventHeader from "@/components/events/eventHeader";
import EventBlog from "@/components/events/eventsBlog";
import EventDetails from "@/components/events/eventDetails";
import { getEventDetails } from "@/actions/events";
import { redirect } from "next/navigation";

const EventPage = async ({ params: { eventId } }) => {
  let event = {};
  try {
    event = await getEventDetails(eventId);
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap p-5 gap-y-10 md:px-10 justify-between">
        <div className="w-full md:w-[calc(60%-30px)]">
          <EventHeader {...event} />
        </div>
        <div className="w-full md:w-[calc(40%-30px)]">
          <EventDetails {...event} />
        </div>
        <div className="w-full md:w-[calc(60%-30px)]">
          <EventBlog blog={event.blog} />
        </div>
      </div>
    </>
  );
};

export default EventPage;
