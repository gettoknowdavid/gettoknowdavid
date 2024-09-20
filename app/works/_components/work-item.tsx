import React from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { WorkT } from "@/types";
import { WorkDetailsModal } from "@/app/works/_components/work-details-modal";

export const WorkItem: React.FC<{ work: WorkT }> = ({ work }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <li
        key={work.id}
        className="flex flex-col items-start text-left border-b-1 border-primary-400 p-pad"
      >
        <div className="flex flex-col md:flex-row gap-1.5 md:gap-2 lg:gap-3 items-start md:items-end">
          <Button
            className="p-0 min-w-0 h-full bg-transparent text-foreground data-[hover]:text-primary-300"
            radius={"none"}
            size={"sm"}
            onPress={onOpen}
          >
            <h1 className="text-2xl md:text-4xxl lg:text-5xl xl:text-5xxl 2xl:text-6xl font-extralight text-foreground">
              {work.title}
            </h1>
          </Button>
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
