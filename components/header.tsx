"use client";

import {Cross as Hamburger} from "hamburger-react";
import Link from "next/link";
import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {MobileMenu} from "@/components/mobile-menu";
import {NavigationList} from "@/components/navigation-list";

export const Header: React.FC = () => {
    const {isOpen, toggleMenu, closeMenu} = useLayoutProvider();

    return (
        <>
            <header className='bg-background text-sm uppercase t-0 w-full h-14 md:h-11 block fixed z-50'>
                <div className='h-full w-auto block'>
                    <div className='h-full w-full relative flex justify-between'>
                        <div className='items-center left-4 flex absolute h-full'>
                            <Link
                                href={"/"}
                                className='bold font-medium tracking-widest z-50'
                                onClick={closeMenu}
                            >
                                David Michael II
                            </Link>
                        </div>
                        <NavigationList/>
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
