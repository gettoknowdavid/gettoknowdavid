"use client";

import Link from "next/link";
import React from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {HouseSimpleIcon} from "@phosphor-icons/react/dist/icons/HouseSimple";
import {useLayoutProvider} from "@/components/layout-context";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";

export const Nav: React.FC = () => {
    const {navItems, socials} = siteConfig;
    const {activeSection, introDone, scrollToSection} = useLayoutProvider();
    const pathname = usePathname();

    if (!introDone) return null;

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only handle hash links (same-page navigation)
        if (href.startsWith('#')) {
            e.preventDefault();
            const sectionId = href.substring(1); // Remove the '#'
            scrollToSection(sectionId);
        }
    };


    return (
        <motion.nav
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5}}
            className='hidden lg:flex flex-col justify-between fixed left-[var(--app-margin)] pt-17 pb-8 w-24 h-full'
        >
            <div>
                <ul className='flex flex-col gap-4'>
                    {navItems.map((item, index) => {
                        const sectionId = item.href.startsWith('#') ? item.href.substring(1) : item.href;
                        const isHashLink = item.href.startsWith('#');
                        const isScrollActive = isHashLink && activeSection === sectionId;
                        const isRouteActive = pathname.startsWith(`/${sectionId}`);
                        const isActive = isScrollActive || isRouteActive;

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
                                    onClick={(e) => {
                                        handleNavClick(e, item.href);
                                    }}
                                    className={cn(
                                        'text-sm font-medium uppercase tracking-widest hover:text-accent',
                                        isActive ? 'text-accent' : '',
                                        'transition duration-300'
                                    )}
                                >
                                    {item.href === '#intro' ? (<HouseSimpleIcon size={20}/>) : item.label}
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