"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const Frame: React.FC = () => {
  const { theme } = useTheme();
  const toBg = `${theme === "light" ? "#000" : "#FFF"}`;
  const fromBg = `${theme === "light" ? "#FFF" : "#000"}`;
  const transition = { ease: "easeInOut", duration: 3 };

  return (
    <div className="fixed z-50 inset-pad mix-blend-difference opacity-60 transition-all pointer-events-none">
      <motion.div
        animate={{ backgroundColor: toBg, opacity: 1 }}
        className="absolute bg-primary-600 left-0 top-0 w-px h-full"
        initial={{ backgroundColor: fromBg, opacity: 0 }}
        transition={transition}
      />
      <motion.div
        animate={{ backgroundColor: toBg, opacity: 1 }}
        className="absolute bg-primary-600 left-0 right-0 w-full h-px"
        initial={{ backgroundColor: fromBg, opacity: 0 }}
        transition={transition}
      />
      <motion.div
        animate={{ backgroundColor: toBg, opacity: 1 }}
        className="absolute bg-primary-600 hidden lg:flex top-0 w-px h-full"
        initial={{ backgroundColor: fromBg, opacity: 0 }}
        transition={transition}
      />
      <motion.div
        animate={{ backgroundColor: toBg, opacity: 1 }}
        className="absolute bg-primary-600 right-0 top-0 w-px h-full"
        initial={{ backgroundColor: fromBg, opacity: 0 }}
        transition={transition}
      />
      <motion.div
        animate={{ backgroundColor: toBg, opacity: 1 }}
        className="absolute bg-primary-600 right-0 bottom-0 w-full h-px"
        initial={{ backgroundColor: fromBg, opacity: 0 }}
        transition={transition}
      />
    </div>
  );
};
