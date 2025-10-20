"use client";

import Link from "next/link";
import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {Home} from "lucide-react";

export const MobileMenu: React.FC = () => {
    const {isOpen} = useLayoutProvider();

    return (
        <div
            className={cn(
                "fixed inset-0 z-40 bg-background md:hidden transition-opacity duration-500",
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

    const {closeMenu, isOpen, scrollToSection} = useLayoutProvider();
    const navItems = siteConfig.navItems;
    const pathname = usePathname();
    const isHome = pathname === '/';

    // 3. Create the new handler
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetHref = e.currentTarget.getAttribute("href");
        if (!targetHref) return;

        closeMenu(); // Close menu first
        window.history.pushState(null, '', targetHref);

        setTimeout(() => { // Keep the delay for menu to close
            if (targetHref === '#') {
                // 4. Animate scroll to top
                scrollToSection();
            } else {
                const targetId = targetHref.substring(1);
                // 5. This now uses our Framer Motion function
                scrollToSection(targetId);
            }
        }, 100);
    };

    return (
        <div className='flex h-full w-full justify-end md:absolute'>
            <nav className='flex-grow flex justify-end items-start'>
                <ul className='flex flex-col gap-4 font-medium uppercase text-right mt-14'>
                    {navItems.map((item, index) => {
                        const isHashLink = item.href.startsWith('#');

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
                                    className='hover:text-gray-400 transition-colors duration-300 '
                                    onClick={isHome && isHashLink ? handleSmoothScroll : closeMenu}
                                >
                                    {item.href === '#' ? <Home size={20}/> : item.label}
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
