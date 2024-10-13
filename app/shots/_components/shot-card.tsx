"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { motion } from "framer-motion";

import { ShotT } from "@/types";
import { Image } from "@/components/image";

export const ShotCard = ({ shot }: { shot: ShotT }) => {
  return (
    <Card
      key={shot.id}
      disableRipple
      isPressable
      classNames={{
        base: "rounded-none bg-transparent shadow-none grid p-0",
        body: "h-auto max-w-full object-cover object-center p-0",
      }}
    >
      <CardBody>
        <Image image={shot.image} />
      </CardBody>
      <motion.div
        className="absolute z-10 top-0 bottom-0 h-full w-full flex items-end opacity-0"
        whileHover={{ opacity: 1, y: [5, 0] }}
      >
        <div className="bg-black/[0.7] py-3 px-5 justify-start w-full text-left">
          <p className="text-white">{shot.title}</p>
        </div>
      </motion.div>
    </Card>
  );
};
