"use client";

import Link from "next/link";
import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {HouseSimpleIcon} from "@phosphor-icons/react/dist/icons/HouseSimple";

export const MobileMenu: React.FC = () => {
    const {isOpen} = useLayoutProvider();

    return (
        <div
            className={cn(
                "fixed inset-0 z-40 bg-background lg:hidden transition-opacity duration-500",
                isOpen ? "opacity-100 visible" : "opacity-0 invisible",
            )}
        >
            <div className='flex flex-col h-full w-full p-4'>
                <NavigationList/>
                <SocialLinksList/>
            </div>
        </div>
    );
};

const NavigationList: React.FC = () => {

    const {closeMenu, isOpen, scrollToSection, activeSection} = useLayoutProvider();
    const navItems = siteConfig.navItems;

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only prevent default for hash links
        if (href.startsWith('#')) {
            e.preventDefault();
            const sectionId = href.substring(1);

            closeMenu(); // Close menu first

            // Small delay for menu close animation
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 300);
        } else {
            // For regular routes, just close menu and let Next.js handle navigation
            closeMenu();
        }
    };

    return (
        <div className='flex h-full w-full justify-end lg:absolute'>
            <nav className='flex-grow flex justify-end items-start'>
                <ul className='flex flex-col gap-4 font-medium uppercase text-right mt-14'>
                    {navItems.map((item, index) => {
                        const sectionId = item.href.startsWith('#') ? item.href.substring(1) : item.href;
                        const isHashLink = item.href.startsWith('#');
                        const isActive = isHashLink && activeSection === sectionId;


                        // Item Fade & Translate: Control individual item animation
                        const itemTranslate = isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-[-10px] opacity-0";

                        // Add a staggered delay for a smoother effect
                        const delay = `${250 + index * 50}ms`;

                        return (
                            <li
                                key={item.href}
                                style={{transitionDelay: delay}}
                                className={`transition-all duration-300 ease-out ${itemTranslate} text-right flex justify-end`}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'hover:text-accent transition-colors duration-300',
                                        isActive && 'text-accent'
                                    )}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                >
                                    {sectionId === 'intro' ? <HouseSimpleIcon size={20}/> : item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

const SocialLinksList: React.FC = () => {
    const {isOpen, closeMenu} = useLayoutProvider();
    const socials = siteConfig.socials;
    return (
        <div className='flex justify-start pb-4'>
            <ul className='flex flex-row flex-wrap gap-3 text-sm text-foreground opacity-80'>
                {socials.map((social) => {
                    // Item Fade & Translate: Control individual item animation
                    const itemTranslate = isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[10px] opacity-0";

                    return (
                        <li
                            key={social.name}
                            className={`transition-all duration-300 ease-out ${itemTranslate}`}
                            style={{transitionDelay: isOpen ? "500ms" : "0ms"}}
                        >
                            <a
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-white transition-colors duration-300'
                                onClick={closeMenu}
                            >
                                {social.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
