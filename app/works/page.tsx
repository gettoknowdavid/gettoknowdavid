import React from "react";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import getWorks from "@/lib/get-works";
import { WorksList } from "@/app/works/_components/works-list";

export const metadata: Metadata = {
  title: {
    default: "Works",
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <section className="flex flex-col w-full relative py-pad-3x md:py-pad-2x bg-transparent">
      <div className="flex flex-row justify-center py-pad-2x">
        <h1 className="text-xl tracking-widest uppercase font-light">
          All Works
        </h1>
      </div>
      <WorksList works={works} />
    </section>
  );
}
