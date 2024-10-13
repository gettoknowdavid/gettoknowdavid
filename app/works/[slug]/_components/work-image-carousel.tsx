"use client";

import React from "react";
import { Image as NextImage } from "@nextui-org/image";

import { AssetT, WorkT } from "@/types";
import { Image } from "@/components/image";

export const WorkImageCarousel = ({ work }: { work: WorkT }) => {
  const images = work.images.items;
  const [selectedImage, setSelectedImage] = React.useState<AssetT>(images[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid aspect-video bg-foreground/[0.05]">
        <Image image={selectedImage} />
      </div>
      <div className="">
        {images && (
          <ul className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`border-2 ${selectedImage === image ? "border-foreground" : "border-transparent"}`}
                onClick={() => setSelectedImage(image)}
              >
                <NextImage
                  className="object-cover rounded-none h-12 lg:h-20"
                  radius="none"
                  shadow="none"
                  sizes="100vw"
                  src={image.url}
                  width="100%"
                />
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
