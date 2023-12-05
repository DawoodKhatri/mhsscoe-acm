"use client";
import MagazineCard from "@/components/magazines/magazineCard";
import MagazineService from "@/services/magazine";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";

const MagazinesPage = () => {
  const imgStackRef = useRef();
  const magazineQuery = useQuery("magazines", async () => {
    return MagazineService.getAllMagazines();
  });

  const { isLoading, error, data: { magazines = [] } = {} } = magazineQuery;

  useEffect(() => {
    setInterval(() => imgStackRef.current?.goNext(), 3000);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-64px-40px)] flex justify-center items-center gap-10">
      <div className="w-full relative z-0">
        {magazines.length > 0 && (
          <ResponsiveContainer
            carouselRef={imgStackRef}
            render={(parentWidth, carouselRef) => {
              return (
                <StackedCarousel
                  ref={carouselRef}
                  slideComponent={({ data: magazines, dataIndex }) => {
                    return (
                      <div
                        key={`magazines_page_thumbnail_${dataIndex}`}
                        className="my-10 w-full aspect-[1/1.414]"
                        data-aos="zoom-in"
                      >
                        <Link href={`/magazines/${magazines[dataIndex]._id}`}>
                          <MagazineCard {...magazines[dataIndex]} />
                        </Link>
                      </div>
                    );
                  }}
                  data={magazines}
                  slideWidth={
                    parentWidth > 480
                      ? parentWidth / (window.innerHeight - 104) > 1
                        ? (window.innerHeight - 144) / 1.414
                        : parentWidth - 250
                      : parentWidth - 64
                  }
                  carouselWidth={parentWidth}
                  maxVisibleSlide={parentWidth > 640 ? 5 : 3}
                  disableSwipe
                  transitionTime={1000}
                />
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MagazinesPage;
