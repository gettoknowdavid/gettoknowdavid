import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Image from "next/image";

import logo from "@/public/icon.png";

export const RootLoader: React.FC<{ finishLoading: () => void }> = ({
  finishLoading,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 3500);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="flex flex-row items-center justify-center w-full h-full">
        <motion.div
          animate={{ opacity: [1, 1] }}
          className="flex flex-row items-center bg-primary-900 justify-center invert dark:invert-0"
          initial={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <Image alt="logo" height={50} id="logo" src={logo} width={50} />
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1] }}
          className="block place-content-end border-1 p-2 border-primary-900 ml-1 h-[50]"
          initial={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <h1 className="m-0 p-0 leading-none text-2xl font-extralight">
            avid Michael II
          </h1>
        </motion.div>
      </div>
    </div>
  );
};
