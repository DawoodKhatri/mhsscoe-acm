import { NAVBAR_LINKS } from "@/constants/navbarItems";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const AppFooter = () => {
  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="flex flex-col sm:flex-row gap-5 justify-evenly items-center text-center sm:text-start">
        <div className="w-3/4 sm:w-1/4 p-5">
          <img
            className="mx-auto sm:mx-0 w-[84px] height-[84px] mb-5"
            src={`/logo.png`}
          />
          <p className="text-white">
            It is a team of students who strive to organize and manage various
            technical and extra-curricular events, workshops and competition.
          </p>
        </div>
        <div className="sm:w-1/4 md:w-1/5 lg:w-1/6 p-5">
          <p className="text-start font-bold text-xl !mt-0">Useful Links</p>
          <ul className="text-start [&>li]:my-3">
            {NAVBAR_LINKS.map(({ label }, index) => (
              <li key={`footer_useful_link_${index}`}>{label}</li>
            ))}
          </ul>
        </div>
        <div className="sm:w-1/4 p-5">
          <p className="font-bold text-xl mb-3">
            M. H. Saboo Siddik College of Engineering
          </p>
          <Link href="https://mhssce.ac.in">https://mhssce.ac.in</Link>
          <div className="mt-5 flex gap-5 justify-center sm:justify-start items-center">
            <Link href="https://www.instagram.com/acm_mhssce">
              <InstagramFilled style={{ fontSize: 24 }} />
            </Link>
            <Link href="https://www.linkedin.com/in/acm-mhsscoe-b6b54824a">
              <LinkedinFilled style={{ fontSize: 24 }} />
            </Link>
          </div>
        </div>
      </div>
      <p className="font-bold text-center mt-10">
        Copyright © 2023 All rights reserved | Designed and Developed by MHSSCOE
        ACM Webmasters
      </p>
    </div>
  );
};

export default AppFooter;
