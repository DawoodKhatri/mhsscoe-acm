const BackgroundAnimation = () => {
  const randomPosition = () => Math.floor(Math.random() * 100) + "%";
  const randomSize = () => Math.floor(Math.random() * 60) + 20 + "px";
  const randomDuration = () => Math.floor(Math.random() * 3000) + 1000 + "ms";

  return (
    <div className="fixed top-0 h-screen w-full overflow-hidden">
      <div className="relative w-full h-screen flex justify-center items-center ">
        <div className="absolute top-[calc(50%-192px)] left-[calc50%-192px] h-80 w-80 rounded-full bg-gradient-to-t from-blue-300  to-cyan-50 animate-pulse duration-200"></div>

        {[...Array(10)].map(() => {
          const size = randomSize();
          return (
            <div
              className="absolute rounded-full bg-gradient-to-t from-blue-300  to-cyan-50 animate-bounce"
              style={{
                top: randomPosition(),
                left: randomPosition(),
                width: size,
                height: size,
                animationDuration: randomDuration(),
              }}
            ></div>
          );
        })}
      </div>

      {/* <img
              className="object-cover align-middle absolute h-screen w-screen top-0"
              src="https://png.pngtree.com/background/20211215/original/pngtree-geometric-gradient-background-with-glassmorphism-effect-and-light-color-picture-image_1472036.jpg"
            /> */}
    </div>
  );
};

export default BackgroundAnimation;
