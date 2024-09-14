"use client";

import NextLink from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export const NavList: React.FC = () => {
  const path = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-8">
        {siteConfig.navItems.map((item) => {
          const isCurrent = path === item.href;

          return (
            <NextLink
              key={item.href}
              className={`text-xs font-medium tracking-wide [&.active]:text-primary-400 ${isCurrent ? "active" : ""}`}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          );
        })}
      </ul>
    </nav>
  );
};
