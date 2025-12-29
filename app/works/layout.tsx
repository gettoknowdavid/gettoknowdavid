import React from "react";
import type {Metadata} from "next";
import {siteConfig} from "@/config/site";

export const metadata: Metadata = {
    title: {
        default: `My Works • ${siteConfig.name}`,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {icon: "/icon.png"},
    authors: siteConfig.authors,
    keywords: siteConfig.keywords,
};

export default function WorksLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className='grid app-margin w-full gap-4 grid--app-columns'>
            <div className='content'>
                {children}
            </div>
        </section>
    );
};