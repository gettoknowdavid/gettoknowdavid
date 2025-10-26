"use client";

import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {MobileMenu} from "@/components/mobile-menu";
import {Hamburger} from "@/components/ui/hamburger";
import {Logo} from "@/components/ui/logo";

export const Header: React.FC = () => {
    const {isOpen, toggleMenu} = useLayoutProvider();

    return (
        <>
            <header className='max-sm:bg-background text-sm uppercase fixed w-full h-14 app-margin z-[100]'>
                <div className='h-full w-full flex justify-between items-center relative'>
                    <div className='h-full w-full relative flex justify-between'>
                        <div className='flex items-center h-full'>
                            <Logo/>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-4">
                            <Hamburger isOpen={isOpen} toggle={toggleMenu}/>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu/>
        </>
    );
};
