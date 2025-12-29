'use client';

import React from "react";
import {cn} from "@/lib/utils";

interface HamburgerProps {
    isOpen: boolean;
    toggle: () => void;
}

export const Hamburger: React.FC<HamburgerProps> = ({isOpen, toggle}) => {

    // Base transition class applied to both bars for a smooth animation
    const baseTransition = "transition-all duration-300 ease-in-out";

    // Conditional classes for the top bar: moves up when closed, centers and rotates 45 degrees when open
    const line1Class = isOpen ? 'translate-y-0 rotate-45' : '-translate-y-1 rotate-0';

    // Conditional classes for the bottom bar: moves down when closed, centers and rotates -45 degrees when open
    const line2Class = isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1 rotate-0';

    return (
        <div aria-label={isOpen ? "Close menu" : "Open menu"}
             className='flex lg:hidden p-3 -mr-3 rounded-3xl cursor-pointer z-50'
             onClick={toggle}>
            <div>
                <div className="w-6 h-6 flex flex-col justify-center">
                    <div className={cn('absolute', baseTransition)}>
                        <div className={cn('w-6 h-[2px] bg-foreground', line1Class)}/>
                    </div>
                    <div className={cn('absolute', baseTransition)}>
                        <div className={cn('w-6 h-[2px] bg-foreground', line2Class)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}