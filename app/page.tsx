import React, { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { Biography } from "@/app/_components/biography";

export default function HomePage() {
  return (
    <section className="block h-full place-content-end">
      <Suspense fallback={<BiographySkeleton />}>
        <Biography />
      </Suspense>
    </section>
  );
}

const BiographySkeleton = () => {
  return (
    <div className="pt-52 flex flex-col gap-6 max-w-xs md:max-w-md lg:max-w-max">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-9 md:h-10 lg:h-display w-48 md:w-56 lg:w-96" />
        <Skeleton className="h-3 lg:h-4 w-28 lg:w-32" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 md:h-4 lg:h-6" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-pad" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-2" />
        <Skeleton className="h-3.5 md:h-4 lg:h-6 mr-pad-4x" />
      </div>
    </div>
  );
};
