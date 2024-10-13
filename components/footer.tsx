import React from "react";

export const Footer = () => {
  return (
    <footer className="absolute bg-transparent right-pad left-pad bottom-pad z-[900]">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between w-full h-full">
        <p className="text-[10px] lg:text-xs uppercase">
          Designed and developed by David Michael II
        </p>
        <p className="text-[10px] lg:text-xs uppercase">
          Reproduction is prohibited
        </p>
      </div>
    </footer>
  );
};
