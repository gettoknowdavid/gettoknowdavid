"use client";

import Link from "next/link";
import type React from "react";
import {siteConfig} from "@/config/site";

export const NavigationList: React.FC = () => {
    const navItems = siteConfig.navItems;

    return (
        <div className='hidden md:flex h-full w-full items-center justify-end right-4 absolute'>
            <nav className='flex-grow flex justify-end items-start'>
                <ul className='flex gap-9'>
                    {navItems.map((item) => {
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className='text-sm font-medium uppercase tracking-widest hover:text-accent transition duration-300'
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
