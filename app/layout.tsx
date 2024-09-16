import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { MobileHeader } from "@/components/mobile-header";
import { NavList } from "@/components/nav-list";
import { Mask } from "@/components/mask";
import { Frame } from "@/components/frame";
import { ThemeSwitch } from "@/components/theme-switch";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="fixed flex flex-col h-screen w-full">
            <Frame />
            <Mask />
            <MobileHeader />
            <div className="relative flex flex-row h-full w-full">
              <header className="absolute left-0 top-0 bottom-0 hidden lg:flex">
                <div className="relative flex flex-col justify-between p-pad-2x lg:px-0 lg:pl-pad-2x lg:py-pad-2x">
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-5xl xl:text-6xl text-foreground ml-[-1px] lg:ml-[-3px] font-extralight">
                      David Michael II
                    </h1>
                    <p className="text-xs lg:text-sm tracking-wide text-primary-500">
                      Frontend Developer
                    </p>
                  </div>
                  <NavList />
                  <ThemeSwitch />
                  <div className="flex flex-col">
                    <small className="text-primary-800">
                      <span className="text-primary-500">
                        Designed & developed by
                      </span>{" "}
                      David Michael II
                      <span className="text-primary-500">.</span>
                    </small>
                    <small className="text-primary-800">
                      <span className="text-primary-500">Inspired by</span>{" "}
                      Keita Yamada <span className="text-primary-500">&</span>{" "}
                      Kadet
                      <span className="text-primary-500">.</span>
                    </small>
                  </div>
                </div>
              </header>
              <main className="basis-full h-full overflow-auto">
                <div className="h-full px-pad-2x lg:items-end lg:py-pad-2x overflow-auto no-scrollbar">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
