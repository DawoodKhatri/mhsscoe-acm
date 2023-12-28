import { getAllEvents } from "@/actions/events";
import EventCard from "@/components/events/eventCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const EventsPage = async () => {
  let events = [];
  try {
    events = await getAllEvents();
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <>
      <div className="text-gray-700 py-10 text-center">
        <h2 className="text-7xl font-bold">Our Events</h2>
      </div>
      <div className="m-5 pb-10">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {events.map((eventDetails, index) => (
            <div key={`admin_events_page_event_item_${index}`}>
              <Link href={`/events/${eventDetails._id}`}>
                <EventCard {...eventDetails} left={index % 2 == 0} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
