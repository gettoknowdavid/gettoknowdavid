"use client";

import React, { Suspense } from "react";

import { Biography } from "@/app/_components/biography";
import { BiographySkeleton } from "@/app/_components/biography-skeleton";

export default function HomePage() {
  return (
    <section className="flex h-full w-full items-end lg:justify-end">
      <div className="flex flex-col gap-6 max-w-xs md:max-w-md lg:max-w-md items-end content-end py-pad-2x lg:py-0">
        <div className="flex lg:hidden flex-col gap-0.5 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-6xl text-foreground ml-[-1px] lg:ml-[-3px] font-extralight">
            David Michael II
          </h1>
          <p className="text-xs lg:text-sm tracking-wide text-primary-500">
            Frontend Developer
          </p>
        </div>
        <Suspense fallback={<BiographySkeleton />}>
          <Biography />
        </Suspense>
      </div>
    </section>
  );
}
