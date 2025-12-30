import type {Metadata} from "next";
import "./globals.css";
import type React from "react";
import {Header} from "@/components/header";
import {LayoutProvider} from "@/components/layout-context";
import {LayoutWrapper} from "@/components/layout-wrapper";
import {neue} from "@/config/fonts";
import {siteConfig} from "@/config/site";
import {Nav} from "@/components/nav";
import {WarpBackground} from "@/components/warp-background";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {getContacts} from "@/lib/queries/get-contacts";

export const metadata: Metadata = {
    title: {
        default: `${siteConfig.name} • ${siteConfig.role}`,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {icon: "/icon.png"},
    authors: siteConfig.authors,
    keywords: siteConfig.keywords,
    other: siteConfig.other,
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const contactLinks = getContacts();

    return (
        <html lang='en'>
        <body className={`${neue.className} dark text-foreground font-sans antialiased p-0 m-0`}>
        <LayoutProvider>
            <WarpBackground/>
            <Header contactLinks={contactLinks}/>
            <Nav contactLinks={contactLinks}/>
            <LayoutWrapper>
                {children}
                <SpeedInsights/>
            </LayoutWrapper>
        </LayoutProvider>
        </body>
        </html>
    );
}
