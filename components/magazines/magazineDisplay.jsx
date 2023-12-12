"use client";
import MagazineCard from "@/components/magazines/magazineCard";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";

const MagazineDisplay = ({ magazines }) => {
  const imgStackRef = useRef();

  useEffect(() => {
    setInterval(() => imgStackRef.current?.goNext(), 3000);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-64px-40px)] relative flex justify-center items-center gap-10">
      <div className="w-full h-full flex justify-center items-center">
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
      <Button
        className="!absolute left-5 top-[calc(50%-20px)] z-[3]"
        onClick={() => imgStackRef.current?.goBack()}
        icon={<DoubleLeftOutlined />}
        type="primary"
        size="large"
      />
      <Button
        className="!absolute right-5 top-[calc(50%-20px)] z-[3]"
        onClick={() => imgStackRef.current?.goNext()}
        icon={<DoubleRightOutlined />}
        type="primary"
        size="large"
      />
    </div>
  );
};

export default MagazineDisplay;
