import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export const BiographySkeleton = () => {
  return (
    <div className="flex flex-col gap-6 max-w-xs md:max-w-md lg:max-w-max w-full py-pad-2x lg:py-0">
      <div className="flex flex-col gap-1.5 items-start lg:hidden">
        <Skeleton className="h-9 md:h-10 lg:h-display w-48 md:w-56 lg:w-96" />
        <Skeleton className="h-3 lg:h-4 w-28 lg:w-32" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-4 lg:mr-0 lg:ml-4" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-pad lg:mr-0 lg:ml-pad" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-pad-3x lg:mr-0 lg:ml-pad-3x" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-pad-2x lg:mr-0 lg:ml-pad-2x" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-pad-4x lg:mr-0 lg:ml-pad-4x" />
      </div>
    </div>
  );
};
