import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { MobileHeader } from "@/components/mobile-header";
import { NavList } from "@/components/nav-list";
import { Logo } from "@/components/logo";

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
          <div className="relative flex flex-col h-screen overflow-hidden">
            {/*<Frame />*/}
            {/*<Mask />*/}
            <MobileHeader />
            <div className="relative z-0 flex flex-row h-full w-full overflow-hidden">
              <header className="basis-1/2 hidden lg:flex justify-end">
                <div className="py-pad-2x px-pad">
                  <Logo />
                </div>
              </header>
              <main className="basis-full flex-grow">
                <div className="h-full px-pad">
                  <div className="h-full flex justify-end items-end">
                    {children}
                  </div>
                </div>
              </main>
              <header className="basis-1/2 hidden lg:flex items-end">
                <div className="py-pad-2x px-pad">
                  <NavList />
                </div>
              </header>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
