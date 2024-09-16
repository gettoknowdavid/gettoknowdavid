import React from "react";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { WorkT } from "@/types";
import { WorkLinks } from "@/app/works/_components/work-link";
import { WorkDetailsModal } from "@/app/works/_components/work-details-modal";

export const WorkItem: React.FC<{ work: WorkT }> = ({ work }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <li
        key={work.id}
        className="flex flex-col items-start lg:items-end text-left lg:text-right"
      >
        <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row gap-1.5 md:gap-2 lg:gap-3 items-start md:items-end">
          <div className="hidden md:flex">
            <WorkLinks links={work.links.items} />
          </div>
          <Button
            className="p-0 min-w-0 h-full bg-transparent data-[hover]:text-primary-300"
            radius={"none"}
            size={"sm"}
            onPress={onOpen}
          >
            <h1 className="text-2xl md:text-4xxl lg:text-5xl xl:text-5xxl 2xl:text-6xl font-extralight">
              {work.title}
            </h1>
          </Button>
        </div>
        <p className="text-xs xl:text-sm max-w-72 md:max-w-md lg:max-w-lg text-left lg:text-right text-primary-500">
          {work.brief}
        </p>
        <Spacer className="h-1.5 md:hidden" />
        <div className="flex md:hidden">
          <WorkLinks links={work.links.items} />
        </div>
      </li>
      <WorkDetailsModal
        isOpen={isOpen}
        work={work}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
