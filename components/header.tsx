"use client";

import {Cross as Hamburger} from "hamburger-react";
import Link from "next/link";
import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {MobileMenu} from "@/components/mobile-menu";
import {usePathname} from "next/navigation";

export const Header: React.FC = () => {
    const {closeMenu, isOpen, scrollToSection, toggleMenu} = useLayoutProvider();
    const pathname = usePathname();
    const isHome = pathname === "/";

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        closeMenu();
        if (isHome) {
            // prevent the default scroll if on home page
            e.preventDefault();
            window.history.pushState(null, '', '/');
            scrollToSection();
        }
    }

    return (
        <>
            <header className='max-sm:bg-background text-sm uppercase w-full h-14 block fixed z-50 app-margin'>
                <div className='h-full w-auto block'>
                    <div className='h-full w-full relative flex justify-between'>
                        <div className='items-center flex absolute h-full'>
                            <Link
                                href={"/"}
                                className='text-xl font-medium text-accent tracking-widest z-50'
                                onClick={handleLogoClick}
                            >
                                David Michael II
                            </Link>
                        </div>
                        <div className='h-full flex md:hidden items-center justify-between absolute right-0 z-50'>
                            <Hamburger
                                toggled={isOpen}
                                toggle={toggleMenu}
                                size={18}
                                hideOutline={true}
                                distance={"sm"}
                            />
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu/>
        </>
    );
};
