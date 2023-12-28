import { FACULTY_INCHARGES } from "@/constants/home";
import React from "react";

const HomeFacultySection = () => {
  return (
    <div className="w-full p-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800 pb-10">
        Meet Our Faculty Incharges
      </h1>
      <div className="w-full flex flex-col sm:flex-row flex-wrap gap-10 justify-center items-center">
        {FACULTY_INCHARGES.map(({ photo, name, post }, index) => (
          <div
            key={`home_page_faculty_incharge_${index}`}
            className="w-full sm:w-[calc(50%-40px)] md:w-[calc(33.33%-40px)] lg:w-1/4 rounded-lg p-5 border-2 border-primary bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
            data-aos="fade-up"
          >
            <img
              className="mx-auto w-1/2 aspect-square object-cover rounded-full mb-5"
              src={`/api/file/${photo}`}
            />
            <p className="text-center text-lg">{name}</p>
            <p className="text-center italic">{post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFacultySection;
