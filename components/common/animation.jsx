import React from "react";

const BackgroundAnimation = () => {
  return (
    <div className="fixed top-0 h-screen w-full overflow-hidden">
      <div className="relative w-full h-screen flex justify-center items-center ">
        <div className="absolute top-[50%] left-[73%] h-20 w-20  rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-21 left-40 h-10 w-10 animate-bounce duration-500 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-11 left-40 h-10 w-10 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-21 right-40 h-10 w-10  rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-96 right-20 h-20 w-20 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-20 right-40 h-10 w-10 duration-15 animate-bounce rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-11 left-40 h-10 w-10 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute bottom-20 left-30 h-10 w-10  rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute bottom-10 left-15 h-10 w-10 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute bottom-40 left-40 h-20 w-20 duration-15 animate-bounce rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
        <div className="absolute top-11 h-2/3 w-4/12  rounded-full  bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
      </div>

      {/* <img
              className="object-cover align-middle absolute h-screen w-screen top-0"
              src="https://png.pngtree.com/background/20211215/original/pngtree-geometric-gradient-background-with-glassmorphism-effect-and-light-color-picture-image_1472036.jpg"
            /> */}
    </div>
  );
};

export default BackgroundAnimation;
