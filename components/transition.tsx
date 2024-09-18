"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <motion.div
      animate={{
        backgroundColor: `${theme === "light" ? "#000" : "#FFF"}`,
        opacity: 1,
      }}
      initial={{
        backgroundColor: `${theme === "light" ? "#FFF" : "#000"}`,
        opacity: 0,
      }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
