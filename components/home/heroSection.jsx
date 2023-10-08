import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Button } from "antd";
import "../../styles/headingAnimation.css";
import { colorPrimary } from "@/constants/colors";

const HeroSection = () => {
  return (
    <Glassmorphism className="px-8 md:px-16">
      <div className="w-full h-[calc(100vh-126px)]  justify-center  items-center flex flex-col ">
        {/* <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider mt-2 text-center"> */}
          <span className="content text-center"
            // style={{
            //   "mix-blend-mode": "difference",
            //   "-webkit-text-stroke": `3px ${colorPrimary}`,
            //   color: "transparent",
            // }}
          >
            <h2 className="font-bold">MHSSCOE ACM</h2>
            <h2 className="font-bold">MHSSCOE ACM</h2>
          </span>
        {/* </p> */}

        <br />
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
