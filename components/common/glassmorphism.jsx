import React from "react";

const Glassmorphism = ({ children, className }) => {
  return (
    <div
      className={`${
        className ?? ""
      } bg-white bg-opacity-10 rounded-lg shadow-5xl border border-opacity-30  backdrop-filter backdrop-blur-md overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default Glassmorphism;
