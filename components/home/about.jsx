"use client";
import React, { useEffect, useState } from "react";

const HomeAboutSection = () => {
  const images = [
    "Static Images/about_section_pic1.jpg",
    "Static Images/about_section_pic2.jpg",
    "Static Images/about_section_pic3.jpg",
    "Static Images/about_section_pic4.jpg",
  ];

  const [currImage, setCurrImage] = useState(0);

  useEffect(() => {
    setTimeout(() => setCurrImage((currImage + 1) % images.length), 3000);
  }, [currImage]);

  return (
    <div className="w-full min-h-[calc(100vh-64px-40px)] relative rounded-lg overflow-hidden">
      <div className="w-full h-full absolute top-0">
        <img
          key={currImage}
          className="w-full h-full object-cover"
          src={`/api/file/${images[currImage]}`}
          data-aos="fade"
        />
      </div>
      <div
        className="w-full min-h-[calc(100vh-64px-40px)] relative bg-gradient-to-r from-gray-900 to-gray-900/50 p-10 flex flex-col gap-5 justify-center"
        data-aos="fade"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
          About ACM
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-white">
          MHSSCOE-ACM is a student chapter of ACM(Association for Computing
          Machinery), the world’s largest educational and scientific computing
          society. MHSSCOE-ACM was established in 2014 under the guidance of
          teachers and with dedication of the students of IT department. Since
          then, this committee aims to strengthen the students collective voice
          through strong leadership, promotion of the highest standards, and
          recognition of technical excellence. It is a team of students who
          strive to organize and manage various technical and extra-curricular
          events, workshops and competition.
        </p>
      </div>
    </div>
  );
};

export default HomeAboutSection;
