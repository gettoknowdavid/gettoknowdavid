"use client";

import Link from "next/link";
import React from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {HouseSimpleIcon} from "@phosphor-icons/react/dist/icons/HouseSimple";
import {useLayoutProvider} from "@/components/layout-context";
import {motion} from "framer-motion";

export const Nav: React.FC = () => {
    const {navItems, socials} = siteConfig;
    const pathname = usePathname();

    const {introDone} = useLayoutProvider();
    if (!introDone) return null;

    return (
        <motion.nav
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5}}
            className='hidden md:flex flex-col justify-between fixed left-[var(--app-margin)] pt-28 pb-8 w-24 h-full'
        >
            <div>
                <ul className='flex flex-col gap-4'>
                    {navItems.map((item, index) => {
                        const isActive = pathname == item.href;
                        return (
                            <motion.li
                                key={item.href}
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.7 + (index * 0.1)
                                }}
                            >
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
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ul className='h-full w-full flex flex-col flex-wrap gap-1'>
                    {socials.map((social, index) => {
                        return (
                            <motion.li
                                key={social.name}
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 1.0 + (index * 0.1)
                                }}
                            >
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
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </motion.nav>
    );
};