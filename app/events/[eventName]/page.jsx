"use client";
import EventDetails from "@/components/event/eventDetails";
import EventNotFound from "@/components/event/notFound";
import { EVENT_DATA } from "@/constants/data";
import React from "react";

const EventPage = ({ params: { eventName } }) => {
  const eventDetails = EVENT_DATA.filter(
    ({ title }) => title === decodeURI(eventName)
  )[0];

  return (
    <>
      {!eventDetails ? (
        <EventNotFound />
      ) : (
        <EventDetails details={eventDetails} />
      )}
    </>
  );
};

export default EventPage;
