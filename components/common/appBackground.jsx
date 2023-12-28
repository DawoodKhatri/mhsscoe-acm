const AppBackground = () => {
  const randomPosition = () => Math.floor(Math.random() * 100) + "%";
  const randomSize = () => Math.floor(Math.random() * 60) + 20 + "px";
  const randomDuration = () => Math.floor(Math.random() * 3000) + 1000 + "ms";

  return (
    <div className="fixed top-0 h-screen w-full overflow-hidden">
      {/* <div className="relative w-full h-screen flex justify-center items-center ">
        <div className="absolute top-[calc(50%-192px)] left-[calc50%-192px] h-80 w-80 rounded-full bg-gradient-to-t from-blue-300  to-cyan-50 animate-pulse duration-200"></div>

        {[...Array(10)].map((_, index) => {
          const size = randomSize();
          return (
            <div
              key={`background_animation_circle_${index}`}
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
      </div> */}
      {/* <img src="/images/bg-2.jpg" className="w-full h-full object-cover"/> */}
      {/* <img
              className="object-cover align-middle absolute h-screen w-screen top-0"
              src="https://png.pngtree.com/background/20211215/original/pngtree-geometric-gradient-background-with-glassmorphism-effect-and-light-color-picture-image_1472036.jpg"
            /> */}

      <div
        className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-52"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400 to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default AppBackground;
