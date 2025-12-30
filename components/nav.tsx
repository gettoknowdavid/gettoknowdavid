"use client";

import Link from "next/link";
import React, {use} from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/utils/utils";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import {useLayoutProvider} from "@/components/layout-context";
import {House} from "lucide-react";
import {Contact} from "@/type";
import Image from "next/image";

export const Nav = ({contactLinks}: { contactLinks: Promise<Contact[]> }) => {
    const {navItems} = siteConfig;
    const pathname = usePathname();
    const {introDone} = useLayoutProvider();

    const contacts = use(contactLinks);

    if (!introDone) return null;


    return (
        <motion.nav
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5}}
            className='hidden lg:flex flex-col justify-between fixed left-[var(--app-margin)] pt-24 pb-8 w-24 h-full'
        >
            <div>
                <ul className='flex flex-col gap-4'>
                    {navItems.map((item, index) => {
                        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
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
                                    {item.href === '/' ? (<House size={20}/>) : item.label}
                                </Link>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ul className='h-full w-full flex flex-col flex-wrap gap-7'>
                    {contacts.map((contact, index) => {
                        return (
                            <motion.li
                                title={contact.label}
                                key={contact.sys.id}
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 1.0 + (index * 0.1)
                                }}
                                className="relative h-6 w-6"
                            >
                                <Link href={contact.link} target='_blank' rel='noopener noreferrer'>
                                    <Image
                                        src={contact.icon.url}
                                        alt={contact.icon.title}
                                        fill
                                        className="object-contain invert hover:scale-150 transition-all duration-300"
                                    />
                                </Link>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </motion.nav>
    );
};