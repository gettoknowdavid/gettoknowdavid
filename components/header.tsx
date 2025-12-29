"use client";

import type React from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {MobileMenu} from "@/components/mobile-menu";
import {Hamburger} from "@/components/ui/hamburger";
import {Logo} from "@/components/ui/logo";
import {motion} from "framer-motion";

export const Header: React.FC = () => {
    const {isOpen, introDone, toggleMenu} = useLayoutProvider();

    if (!introDone) return null;

    return (
        <>
            <motion.header
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3}}
                className='bg-background lg:bg-transparent fixed w-full h-14 lg:h-24 app-margin z-[100]'
            >
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
            </motion.header>
            <MobileMenu/>
        </>
    );
};