"use client";

import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "next-themes";

export const Mask: React.FC = () => {
  const { theme } = useTheme();

  const inlineVariant = {
    visible: { opacity: 1, x: 0 },
    hiddenLeft: { opacity: 0.9, x: "calc(var(--pad) * -1)" },
    hiddenRight: { opacity: 0.9, x: "var(--pad)" },
  };

  const blockVariant = {
    visible: { opacity: 1, y: 0 },
    hiddenTop: { opacity: 0.9, y: "calc(var(--pad) * -1)" },
    hiddenBottom: { opacity: 0.9, y: "var(--pad)" },
  };

  return (
    <div className="fixed z-50 left-0 top-0 h-full w-full pointer-events-none opacity-90 transition-all">
      <motion.div
        animate="visible"
        className="absolute bg-primary-100 left-0 w-pad h-full"
        initial="hiddenLeft"
        transition={{ ease: "easeInOut", duration: 1.5 }}
        variants={inlineVariant}
      />
      <motion.div
        animate="visible"
        className="absolute bg-primary-100 top-0 w-full h-pad"
        initial="hiddenTop"
        transition={{ ease: "easeInOut", duration: 1.5 }}
        variants={blockVariant}
      />
      <motion.div
        animate="visible"
        className="absolute bg-primary-100 right-0 w-pad h-full"
        initial="hiddenRight"
        transition={{ ease: "easeInOut", duration: 1.5 }}
        variants={inlineVariant}
      />
      <motion.div
        animate="visible"
        className="absolute bg-primary-100 bottom-0 w-full h-pad"
        initial="hiddenBottom"
        transition={{ ease: "easeInOut", duration: 1.5 }}
        variants={blockVariant}
      />
    </div>
  );
};
