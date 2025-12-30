"use client";

import Link from "next/link";
import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {siteConfig} from "@/config/site";
import {cn} from "@/utils/utils";
import {House} from "lucide-react";
import {Contact} from "@/type";
import {usePathname} from "next/navigation";

export const MobileMenu = ({contacts}: { contacts: Contact[] }) => {
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
                <ContactsLinkList contacts={contacts}/>
            </div>
        </div>
    );
};

const NavigationList: React.FC = () => {
    const pathname = usePathname();
    const {closeMenu, isOpen} = useLayoutProvider();
    const navItems = siteConfig.navItems;

    return (
        <div className='flex h-full w-full justify-end lg:absolute'>
            <nav className='flex-grow flex justify-end items-start'>
                <ul className='flex flex-col gap-6 text-base tracking-wide font-regular uppercase text-right mt-16'>
                    {navItems.map((item, index) => {
                        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);


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
                                    onClick={closeMenu}
                                >
                                    {item.href === '/' ? <House size={20}/> : item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

const ContactsLinkList = ({contacts}: { contacts: Contact[] }) => {
    const {isOpen, closeMenu} = useLayoutProvider();
    return (
        <div className='flex justify-start pb-4'>
            <ul className='flex flex-col flex-wrap gap-3 text-base text-foreground opacity-80'>
                {contacts.map((contact) => {
                    // Item Fade & Translate: Control individual item animation
                    const itemTranslate = isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[10px] opacity-0";

                    return (
                        <li
                            key={contact.sys.id}
                            className={`transition-all duration-300 ease-out ${itemTranslate}`}
                            style={{transitionDelay: isOpen ? "500ms" : "0ms"}}
                        >
                            <Link
                                href={contact.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-white transition-colors duration-300'
                                onClick={closeMenu}
                            >
                                {contact.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
