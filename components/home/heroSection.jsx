import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Button } from "antd";
import { colorPrimary } from "@/constants/colors";

const HeroSection = () => {
  return (
    <Glassmorphism className="px-8 md:px-16">
      <div className="w-full min-h-[calc(100vh-126px)]  justify-center  items-center flex flex-col ">
        <div className="relative text-center w-full">
          <h2
            className="font-bold text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent"
            style={{ WebkitTextStroke: `2px ${colorPrimary}` }}
          >
            MHSSCOE ACM
          </h2>
          <h2 className="font-bold text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl w-full absolute top-0 left-[50%] -translate-x-[50%] text-primary animate-[water-flow-animation_4s_ease-in-out_infinite]">
            MHSSCOE ACM
          </h2>
        </div>
        <p className="text-primary-dark text-center mt-10 font-semibold uppercase text-sm">
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
        <div className="flex gap-5 mt-7">
          <Button className="mr-2 bg-primary" type="primary" size="large">
            Meet the Team
          </Button>
          <Button className="ml-2 bg-primary" type="primary" size="large">
            Login
          </Button>
        </div>
      </div>
    </Glassmorphism>
  );
};

export default HeroSection;
