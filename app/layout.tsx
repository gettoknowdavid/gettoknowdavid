import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
    <body
      className={clsx(
        "min-h-screen font-sans antialiased bg-background relative",
        fontSans.className
      )}
    >
    <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </Providers>
    </body>
    </html>
  );
}
