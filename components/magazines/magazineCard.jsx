import React from "react";

const MagazineCard = ({ title, description, thumbnail }) => {
  return (
    <div className="w-full h-full relative hover:[&>div]:opacity-100 rounded-lg overflow-hidden">
      <img className="w-full h-full" src={`/api/file/${thumbnail}`} />
      <div className="opacity-0 w-full h-full p-5 flex flex-col justify-end gap-3 md:gap-5 absolute top-0 bg-gradient-to-t from-primary to-primary-light/50 text-white transition-all duration-300 ease-in-out">
        <h2 className="text-2xl md:text-5xl font-bold">{title}</h2>
        <p className="text-base md:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default MagazineCard;
