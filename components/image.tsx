"use client";

import React from "react";
import { Image as NextImage } from "@nextui-org/image";
import { Image as ImageIcon } from "@phosphor-icons/react";

import { AssetT } from "@/types";

export const Image = ({ image }: { image?: AssetT | undefined }) => {
  return (
    <>
      {image ? (
        <NextImage
          className="object-cover w-full rounded-none h-full"
          radius="none"
          shadow="none"
          sizes="100vw"
          src={image.url}
          width="100%"
        />
      ) : (
        <div className="grid justify-center items-center">
          <ImageIcon className="text-primary-500" size={50} />
        </div>
      )}
    </>
  );
};
