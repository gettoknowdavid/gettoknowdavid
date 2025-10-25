import type {Metadata} from "next";
import "./globals.css";
import type React from "react";
import {Header} from "@/components/header";
import {LayoutProvider} from "@/components/layout-context";
import {LayoutWrapper} from "@/components/layout-wrapper";
import {satoshi} from "@/config/fonts";
import {siteConfig} from "@/config/site";
import {Nav} from "@/components/nav";
import {ApolloWrapper} from "@/app/apollo-wrapper";

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
        <body
            className={`${satoshi.variable} dark text-foreground font-sans antialiased p-0 m-0`}
        >
        <ApolloWrapper>
            <LayoutProvider>
                <Header/>
                <Nav/>
                <LayoutWrapper>
                    {children}
                </LayoutWrapper>
            </LayoutProvider>
        </ApolloWrapper>
        </body>
        </html>
    );
}
