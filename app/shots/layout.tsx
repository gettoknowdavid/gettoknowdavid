import React from "react";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Shots",
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
};
export default function ShotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen py-pad-3x md:py-pad-2x max-w-[1440px] mx-auto">
      <div className="flex flex-row justify-center py-pad-2x">
        <h1 className="text-xl tracking-widest uppercase font-light">Shots</h1>
      </div>
      {children}
    </section>
  );
}
