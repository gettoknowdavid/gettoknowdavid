import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image as NextImage } from "@nextui-org/image";
import { Image } from "@phosphor-icons/react";

import { WorkT } from "@/types";

export const WorkItem: React.FC<{ work: WorkT }> = ({ work }) => {
  const router = useRouter();

  return (
    <Card
      disableRipple
      isPressable
      classNames={{
        base: "grid bg-background shadow-none",
        body: "grid aspect-square p-0",
        header: "text-xl tracking-tight px-0 pb-0",
        footer: "text-xs px-0 pt-0.5 uppercase font-light text-left",
      }}
      radius="none"
      onPress={() => router.push(`/works/${work.slug}`)}
    >
      <CardBody>
        {work.image ? (
          <NextImage
            className="object-cover w-full rounded-none h-full"
            sizes="100vw"
            src={work.image.url}
            width="100%"
          />
        ) : (
          <div className="grid justify-center items-center bg-foreground/[0.05]">
            <Image className="text-primary-500" size={50} />
          </div>
        )}
      </CardBody>
      <CardHeader>{work.title}</CardHeader>
      <CardFooter>{work.tags.join(", ")}</CardFooter>
    </Card>
  );
};
