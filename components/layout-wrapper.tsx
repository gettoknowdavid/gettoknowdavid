"use client";

import type * as React from "react";
import type {ReactNode} from "react";
import {useLayoutProvider} from "@/components/layout-context";

interface LayoutWrapper {
    children: ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapper> = ({children}) => {
    const {isOpen} = useLayoutProvider();

    // Conditional class for the main content fade-out
    const contentFade = isOpen ? "opacity-0 pointer-events-none" : "opacity-100";

    return (
        <main className={`transition duration-300 ease-in-out ${contentFade}`}>
            {children}
        </main>
    );
};
