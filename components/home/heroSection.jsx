"use client";

import React, { useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";

const HeroSection = () => {
  const imgStackRef = useRef();
  const [imgStackTimer, setImgStackTimer] = useState();

  useEffect(() => {
    if (!imgStackTimer)
      setImgStackTimer(setInterval(() => imgStackRef.current?.goNext(), 3000));

    AOS.init({
      duration: 2000,
    }); // Initialize AOS
  }, []);

  return (
    <div className="sm:min-h-[calc(100vh-64px-40px)] flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div className="relative isolate p-6 lg:p-8">
          <div className="max-w-2xl">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Checkout our latest events!{" "}
                <Link className="font-semibold text-primary" href="/events">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  More info<span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                data-aos="fade-right"
              >
                ACM Chapter
                <br />
                <span className="text-5xl text-gray-500">
                  M. H. Saboo Siddik <br />
                  College of Engineering
                </span>
                <br />
                <span className="text-3xl text-gray-500">2023-24</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Empowering Minds, Igniting Futures and Building Leaders
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-primary"
                  href="/register"
                >
                  Join Us
                </Link>
                <Link
                  className="text-sm font-semibold leading-6 text-gray-900"
                  href="/teams"
                >
                  Meet our team <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full relative z-0">
          <ResponsiveContainer
            carouselRef={imgStackRef}
            render={(parentWidth, carouselRef) => {
              return (
                <StackedCarousel
                  ref={carouselRef}
                  slideComponent={({ data, dataIndex }) => {
                    return (
                      <img
                        className="my-10 w-full aspect-[4/3] object-cover rounded-lg shadow-xl"
                        src={data[dataIndex].cover}
                        data-aos="zoom-in"
                      />
                    );
                  }}
                  data={[
                    {
                      cover: "/api/file/Static Images/hero_section_pic1",
                    },

                    {
                      cover: "/api/file/Static Images/hero_section_pic2",
                    },
                    {
                      cover: "/api/file/Static Images/hero_section_pic3",
                    },
                    {
                      cover: "/api/file/Static Images/hero_section_pic4",
                    },
                  ]}
                  slideWidth={(parentWidth * 3) / 4}
                  carouselWidth={parentWidth}
                  maxVisibleSlide={3}
                  disableSwipe
                  transitionTime={1000}
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
