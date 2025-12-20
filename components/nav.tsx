"use client";

import Link from "next/link";
import React from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {HouseSimpleIcon} from "@phosphor-icons/react/dist/icons/HouseSimple";

export const Nav: React.FC = () => {
    const {navItems, socials} = siteConfig;
    const pathname = usePathname();

    return (
        <nav
            className='hidden md:flex flex-col justify-between fixed left-[var(--app-margin)] pt-28 pb-8 w-24 h-full'>
            <div>
                <ul className='flex flex-col gap-4'>
                    {navItems.map((item) => {
                        const isActive = pathname == item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'text-sm font-medium uppercase tracking-widest hover:text-accent',
                                        isActive ? 'text-accent' : '',
                                        'transition duration-300'
                                    )}
                                >
                                    {item.href === '/' ? (<HouseSimpleIcon size={20}/>) : item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ul className='h-full w-full flex flex-col flex-wrap gap-1'>
                    {socials.map((social) => {
                        return (
                            <li key={social.name}>
                                <a
                                    href={social.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={cn(
                                        "text-xs uppercase tracking-wider hover:opacity-50",
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
        </nav>
    );
};
