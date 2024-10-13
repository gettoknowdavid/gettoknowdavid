import React from "react";

import { ShotsList } from "@/app/shots/_components/shots-list";

export default async function ShotsPage() {
  return (
    <div className="w-full px-pad">
      <ShotsList />
    </div>
  );
}
