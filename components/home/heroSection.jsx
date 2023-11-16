"use client";

import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Button } from "antd";
import { colorPrimary } from "@/constants/colors";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    }); // Initialize AOS
  }, []);

  return (
    <div className="h-fit my-auto">
      <div className="flex items-center justify-center overflow-auto">
        <div className="relative isolate px-6 py-14 lg:px-8">
          <div className="max-w-2xl">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Checkout our latest events!{" "}
                <Link
                  className="font-semibold text-primary"
                  href="/events"
                >
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
                ACM Chapter &apos;23
                <br />
                <span className="text-5xl text-gray-500">M H Saboo Siddik</span>
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
    </div>
  );
};

export default HeroSection;
