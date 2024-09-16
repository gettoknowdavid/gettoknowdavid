"use client";

import NextLink from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export const NavList: React.FC = () => {
  const path = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-4 lg:gap-7 items-end lg:items-start">
        {siteConfig.navItems.map((item) => {
          const isCurrent = path === item.href;

          return (
            <NextLink
              key={item.href}
              className={`text-xs lg-text-sm font-medium text-right lg:text-left flex-row flex items-center gap-2 tracking-wide [&.active]:text-primary-400 ${isCurrent ? "active" : ""}`}
              color="foreground"
              href={item.href}
            >
              <div
                className={`h-1.5 w-1.5 hidden lg:flex [&.active]:bg-primary-900 ${isCurrent ? "active" : ""}`}
              />
              {item.label}
              <div
                className={`h-1.5 w-1.5 lg:hidden [&.active]:bg-primary-900 ${isCurrent ? "active" : ""}`}
              />
            </NextLink>
          );
        })}
      </ul>
    </nav>
  );
};
