"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Template({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <motion.div
      animate={{
        y: 0,
        opacity: 1,
        // backgroundColor: `${theme === "light" ? "#000" : "#FFF"}`,
      }}
      className="h-full"
      initial={{
        y: 20,
        opacity: 0,
        // backgroundColor: `${theme === "light" ? "#FFF" : "#000"}`,
      }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
