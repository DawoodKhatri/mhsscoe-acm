import React from "react";
import Glassmorphism from "../common/glassmorphism";

const EventNotFound = () => {
  return (
    <Glassmorphism className="h-[calc(100vh-126px)] flex flex-col justify-center items-center gap-6">
      <img className="max-w-sm w-full" src="/images/void.png" />
      <h2
        className={`font-bold text-3xl sm:text-4xl md:text-5xl text-primary-dark`}
      >
        Event Not Found
      </h2>
    </Glassmorphism>
  );
};

export default EventNotFound;
