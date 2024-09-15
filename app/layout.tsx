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
            {/*<Frame />*/}
            <Mask />
            <MobileHeader />
            <div className="relative flex flex-row h-full w-full">
              <header className="basis-1/2 xl:basis-1/2 hidden lg:flex">
                <div className="flex flex-col justify-between p-pad-2x lg:p-pad-3x xl:p-pad-4x">
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground ml-[-1px] lg:ml-[-3px] font-extralight">
                      David Michael II
                    </h1>
                    <p className="text-xs lg:text-sm tracking-wide text-primary-500">
                      Frontend Developer
                    </p>
                  </div>
                  <NavList />
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
              <main className="basis-full lg:basis-1/2 xl:basis-1/2 h-full overflow-auto">
                <div className="h-full px-pad-2x lg:items-end lg:p-pad-3x xl:p-pad-4x overflow-auto no-scrollbar">
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
// bg-pink-300 md:bg-purple-300 lg:bg-yellow-300 xl:bg-green-300 2xl:bg-white-300