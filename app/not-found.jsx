import Glassmorphism from "@/components/common/glassmorphism";
import React from "react";

const PageNotFound = () => {
  return (
    <Glassmorphism className="h-[calc(100vh-126px)] flex flex-col justify-center items-center gap-6">
      <img className="max-w-sm w-full" src="/images/void.png" />
      <h2
        className={`font-bold text-3xl sm:text-4xl md:text-5xl text-primary-dark`}
      >
        Page Not Found
      </h2>
    </Glassmorphism>
  );
};

export default PageNotFound;
