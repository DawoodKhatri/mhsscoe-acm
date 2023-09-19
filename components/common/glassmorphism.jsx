import React from "react";

const Glassmorphism = ({ children, className }) => {
  return (
    <div
      className={`${
        className ?? ""
      } bg-white bg-opacity-20 rounded-lg shadow-5xl border border-opacity-30  backdrop-filter backdrop-blur-sm overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default Glassmorphism;
