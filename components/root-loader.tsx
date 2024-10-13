import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Image from "next/image";

import logo from "@/public/icon.png";

export const RootLoader: React.FC<{ finishLoading: () => void }> = ({
                                                                      finishLoading
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
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
        >
          <h1 className="m-0 p-0 leading-none text-2xl font-extralight uppercase">
            David Michael II
          </h1>
        </motion.div>
      </div>
    </div>
  );
};
