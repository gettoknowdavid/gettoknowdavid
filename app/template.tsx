"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="h-full bg-transparent"
      initial={{ opacity: 0, scale: 1.05 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
