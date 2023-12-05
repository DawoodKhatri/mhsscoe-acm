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
      <div className="flex gap-5 justify-center items-center">
        <div className="w-1/4 p-5">
          <img className="w-[84px] height-[84px] filter" src={`/logo.png`} />
          <p className="text-white">
            It is a team of students who strive to organize and manage various
            technical and extra-curricular events, workshops and competition.
          </p>
        </div>
        <div className="w-1/4 p-5">
          <ul className="text-center [&>li]:my-3">
            <li className="font-bold text-xl !mt-0">Useful Links</li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/team">Our Team</Link>
            </li>
            <li>
              <Link href="/magazines">Magazines</Link>
            </li>
          </ul>
        </div>
        <div className="w-1/4 p-5">
          <p className="font-bold text-xl mb-3">
            M. H. Saboo Siddik College of Engineering
          </p>
          <Link href="https://mhssce.ac.in">https://mhssce.ac.in</Link>
          <div className="mt-5 flex justify-evenly items-center">
            <Link href="https://instagram.com">
              <InstagramFilled style={{ fontSize: 24 }} />
            </Link>
            <Link href="https://instagram.com">
              <FacebookFilled style={{ fontSize: 24 }} />
            </Link>
            <Link href="https://instagram.com">
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
