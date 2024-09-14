import React from "react";

export const Mask: React.FC = () => {
  return (
    <div className="fixed z-40 left-0 top-0 h-full w-full pointer-events-none opacity-90 transition-all">
      <div className="absolute bg-primary-100 left-0 w-pad h-full" />
      <div className="absolute bg-primary-100 top-0 w-full h-pad" />
      <div className="absolute bg-primary-100 right-0 w-pad h-full" />
      <div className="absolute bg-primary-100 bottom-0 w-full h-pad" />
    </div>
  );
};
