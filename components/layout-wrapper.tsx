"use client";

import type * as React from "react";
import type {ReactNode} from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {cn} from "@/lib/utils";

interface LayoutWrapper {
    children: ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapper> = ({children}) => {
    // Grab introDone from context
    const {isOpen, introDone} = useLayoutProvider();

    // Logic:
    // 1. If Intro NOT done -> Hidden
    // 2. If Menu Open -> Hidden
    // 3. Otherwise -> Visible

    let contentState = "opacity-100";

    if (!introDone || isOpen) {
        contentState = "opacity-0 pointer-events-none";
    }

    return (
        <main
            className={cn(
                // Increased duration to 2000ms for a slow, cinematic fade-in of the content
                'transition-all duration-[3000ms] ease-in-out',
                contentState
            )}
        >
            {children}
        </main>
    );
};
