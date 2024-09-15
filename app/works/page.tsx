"use client";

import React, { Suspense } from "react";

import { WorksList } from "@/app/works/_components/works-list";

export default function WorksPage() {
  return (
    <div className="block h-full place-content-end">
      <Suspense fallback={<div>Loading...</div>}>
        <WorksList />
      </Suspense>
    </div>
  );
}
