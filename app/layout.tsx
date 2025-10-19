import type {Metadata} from "next";
import "./globals.css";
import type React from "react";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {LayoutProvider} from "@/components/layout-context";
import {LayoutWrapper} from "@/components/layout-wrapper";
import {satoshi} from "@/config/fonts";
import {siteConfig} from "@/config/site";

export const metadata: Metadata = {
    title: {
        default: `${siteConfig.name} • ${siteConfig.role}`,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/icon.png",
    },
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
        <body className={`${satoshi.variable} font-sans antialiased p-0 m-0`}>
        <LayoutProvider>
            <Header/>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer/>
        </LayoutProvider>
        </body>
        </html>
    );
}
