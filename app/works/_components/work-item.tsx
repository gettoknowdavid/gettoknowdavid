import React from "react";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";

import { WorkT } from "@/types";
import { WorkLinks } from "@/app/works/_components/work-link";

export const WorkItem: React.FC<{ work: WorkT }> = ({ work }) => {
  return (
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
        >
          <h1 className="text-2xl md:text-4xxl xl:text-5xl 2xl:text-6xl font-extralight">
            {work.title}
          </h1>
        </Button>
      </div>
      <p className="text-xs xl:text-sm max-w-72 md:max-w-md lg:max-w-lg text-primary-500 block lg:hidden">
        {work.brief}
      </p>
      <Spacer className="h-1.5 md:hidden" />
      <div className="flex md:hidden">
        <WorkLinks links={work.links.items} />
      </div>
    </li>
  );
};
