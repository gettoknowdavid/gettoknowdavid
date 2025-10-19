"use client";

import type React from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";

export const Footer: React.FC = () => {
    const socials = siteConfig.socials;
    return (
        <footer className='hidden md:block bg-background bottom-0 w-full h-11 fixed z-50'>
            <div className='h-full w-auto relative flex justify-between'>
                <ul className='h-full w-full flex flex-row flex-wrap items-center justify-center gap-3'>
                    {socials.map((social) => {
                        return (
                            <li
                                key={social.name}
                                className='transition-all duration-300 before:pr-3 before:content-["•"] first:before:content-none'
                            >
                                <a
                                    href={social.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={cn(
                                        "text-xs text-foreground uppercase tracking-wider hover:opacity-30",
                                        "transition duration-300",
                                    )}
                                >
                                    {social.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </footer>
    );
};
