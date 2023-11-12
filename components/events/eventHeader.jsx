import React from "react";
import Glassmorphism from "../common/glassmorphism";

const EventHeader = ({ title, description, thumbnail }) => {
  return (
    <>
      <Glassmorphism className="p-5">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}</h2>
        <p className="text-lg md:text-xl text-gray-700">{description}</p>
      </Glassmorphism>
      <Glassmorphism className="mt-5">
        <img
          className="w-full aspect-[4/3] object-cover"
          src={`/api/file/${thumbnail}`}
        />
      </Glassmorphism>
    </>
  );
};

export default EventHeader;
