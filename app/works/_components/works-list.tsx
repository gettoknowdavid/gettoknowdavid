"use client";

import React from "react";

import { WorkT } from "@/types";
import { WorkItem } from "@/app/works/_components/work-item";

export const WorksList: React.FC<{ works: WorkT[] }> = ({ works }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 lg:px-pad max-w-[1440px] mx-auto">
      {works.map((work, index) => (
        <WorkItem key={index} work={work} />
      ))}
    </ul>
  );
};
