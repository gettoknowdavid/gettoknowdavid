import React from "react";

export const Frame: React.FC = () => {
  return (
    <div className="fixed z-50 inset-pad mix-blend-difference opacity-60 transition-all pointer-events-none">
      <div className="absolute bg-primary-600 left-0 top-0 w-px h-full" />
      <div className="absolute bg-primary-600 left-0 right-0 w-full h-px" />
      <div className="absolute bg-primary-600 hidden lg:flex top-0 w-px h-full" />
      <div className="absolute bg-primary-600 right-0 top-0 w-px h-full" />
      <div className="absolute bg-primary-600 right-0 bottom-0 w-full h-px" />
    </div>
  );
};
