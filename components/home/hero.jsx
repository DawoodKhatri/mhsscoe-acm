"use client";

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";
import { Button } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { HERO_SECTION_IMAGES } from "@/constants/home";

const HomeHeroSection = () => {
  const imgStackRef = useRef();
  const [imgStackTimer, setImgStackTimer] = useState();

  useEffect(() => {
    if (!imgStackTimer)
      setImgStackTimer(setInterval(() => imgStackRef.current?.goNext(), 3000));
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px-40px)] flex flex-col md:flex-row">
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
                className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 "
                data-aos="fade-right"
              >
                ACM Chapter
                <br />
                <span className="text-3xl sm:text-5xl md:text-3xl lg:text-5xl text-gray-500">
                  M. H. Saboo Siddik <br />
                  College of Engineering
                </span>
                <br />
                <span className="text-3xl sm:text-5xl md:text-3xl lg:text-5xl text-gray-500">
                  2023-24
                </span>
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
      <div className="flex-1 aspect-[4/3]">
        <div className="w-full h-full relative">
          <div className="w-full h-full absolute top-0 flex justify-center items-center -z-[1]">
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
                          src={`/api/file/${data[dataIndex]}`}
                          data-aos="zoom-in"
                        />
                      );
                    }}
                    data={HERO_SECTION_IMAGES}
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
          <div className="relative w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="px-5 flex-grow flex justify-between">
              <Button
                onClick={() => imgStackRef.current?.goBack()}
                icon={<DoubleLeftOutlined />}
                type="primary"
              />
              <Button
                onClick={() => imgStackRef.current?.goNext()}
                icon={<DoubleRightOutlined />}
                type="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
