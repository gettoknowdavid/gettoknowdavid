"use client";

import Link from "next/link";
import React, {useState} from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {useLayoutProvider} from "@/components/layout-context";
import {Home} from "lucide-react";

export const Nav: React.FC = () => {
    const {navItems, socials} = siteConfig;
    const {scrollToSection} = useLayoutProvider();
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [currentHash, setCurrentHash] = useState<string>('');

    // This resolves the hydration mismatch error
    React.useEffect(() => {
        setCurrentHash(window.location.hash);
    }, [pathname]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetHref = e.currentTarget.getAttribute("href");
        if (!targetHref) return;

        // Update URL first
        window.history.pushState(null, '', targetHref);

        setCurrentHash(targetHref);

        if (targetHref === '#') {
            scrollToSection();
        } else {
            const targetId = targetHref.substring(1);
            scrollToSection(targetId);
        }
    }

    return (
        <nav className='hidden md:flex flex-col justify-between fixed left-12 pt-28 pb-8 w-24 h-full'>
            <div>
                <ul className='flex flex-col gap-4'>
                    {navItems.map((item) => {
                        const isHashLink = item.href.startsWith('#');

                        let isActive: boolean;

                        if (isHashLink) {
                            if (item.href === '#') {
                                // Home link is active if on homepage and hash is empty or just '#'
                                isActive = isHome && (currentHash === '' || currentHash === '#');
                            } else {
                                // Other hash links check for an exact hash match
                                isActive = isHome && currentHash === item.href;
                            }
                        } else {
                            // Standard links check for pathname match
                            isActive = pathname === item.href;
                        }

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'text-sm font-medium uppercase tracking-widest hover:text-accent',
                                        isActive ? 'text-accent' : '',
                                        'transition duration-300'
                                    )}
                                    onClick={isHome && isHashLink ? handleSmoothScroll : undefined}
                                >
                                    {item.href === '#' ? (<Home size={20}/>) : item.label}
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
                                        "text-xs text-neutral-400 uppercase tracking-wider hover:opacity-30",
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
