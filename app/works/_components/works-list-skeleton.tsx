import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";

export const WorksListSkeleton = () => {
  return (
    <ul className="flex flex-col items-start lg:items-end gap-5 md:gap-6 lg:gap-7 xl:gap-9">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start lg:items-end text-left lg:text-right"
        >
          <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row gap-1.5 md:gap-2 lg:gap-3 items-start md:items-end">
            <div className="hidden md:flex gap-4">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-8 md:h-11 lg:h-12 xl:h-12 2xl:h-[3.75rem] w-52 md:w-80 lg:w-[409px] xl:w-[450px]" />
          </div>

          <Spacer className="h-1" />

          <Skeleton className="h-2.5 xl:h-5 w-56 md:w-96" />
          <Spacer className="h-0.5" />
          <Skeleton className="h-2.5 xl:h-5 w-44 md:w-48" />

          <Spacer className="h-1.5 md:hidden" />
          <div className="flex gap-4 md:hidden">
            <Skeleton className="h-2 w-10" />
            <Skeleton className="h-2 w-10" />
          </div>
        </div>
      ))}
    </ul>
  );
};
