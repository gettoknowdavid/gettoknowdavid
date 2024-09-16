"use client";

import React, { Suspense } from "react";

import { WorksList } from "@/app/works/_components/works-list";
import { WorksListSkeleton } from "@/app/works/_components/works-list-skeleton";

export default function WorksPage() {
  return (
    <div className="block h-full place-content-end">
      <Suspense fallback={<WorksListSkeleton />}>
        <WorksList />
      </Suspense>
    </div>
  );
}
