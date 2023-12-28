import React from "react";
import Glassmorphism from "../common/glassmorphism";

const EventHeader = ({ title, description, poster }) => {
  return (
    <>
      <Glassmorphism className="p-5">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}</h2>
        <p className="text-lg md:text-xl text-gray-700">{description}</p>
      </Glassmorphism>
      <Glassmorphism className="mt-10">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <div className="absolute top-0 w-full h-full">
            <img
              className="w-full h-full object-cover blur-lg"
              src={`/api/file/${poster}`}
            />
          </div>
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-contain"
              src={`/api/file/${poster}`}
            />
          </div>
        </div>
      </Glassmorphism>
    </>
  );
};

export default EventHeader;
