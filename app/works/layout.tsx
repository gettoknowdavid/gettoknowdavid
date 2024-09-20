import React from "react";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";

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
export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="no-scrollbar">{children}</section>;
}
