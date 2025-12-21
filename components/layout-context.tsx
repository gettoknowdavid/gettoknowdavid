"use client";

import React, {createContext, type ReactNode, useCallback, useContext, useRef, useState} from "react";
import {animate} from "framer-motion";

// Define the shape of the context
interface LayoutContextType {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;

    introDone: boolean;
    setIntroDone: (v: boolean) => void;

    sectionRefs: React.RefObject<Map<string, HTMLElement>>;
    registerSection: (id: string, element: HTMLElement) => void;
    scrollToSection: (id?: string | null) => void;
}

// Create the context with default values
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Define the Provider component
interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [introDone, setIntroDone] = useState(false);

    // Use a ref to hold the map so it persists across renders without causing re-renders
    const sectionRefs = useRef(new Map<string, HTMLElement>());

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    // Allows section components to register themselves
    const registerSection = useCallback((id: string, element: HTMLElement) => {
        if (element) sectionRefs.current.set(id, element);
    }, []);

    // The main scroll handler
    const scrollToSection = (id?: string | null) => {
        const currentY = window.scrollY;

        if (id) {
            const element = sectionRefs.current.get(id);
            if (!element) return;

            const targetY = element.offsetTop;

            // Use Framer Motion's animate function
            animate(currentY, targetY, {
                type: "spring",
                damping: 30,
                stiffness: 200,
                onUpdate: (latest) => window.scrollTo(0, latest),
            });
        } else {
            // If no ID is passed, then scroll to the top
            animate(currentY, 0, {
                type: "spring",
                damping: 30,
                stiffness: 200,
                onUpdate: (latest) => window.scrollTo(0, latest),
            });
        }
    };

    return (
        <LayoutContext.Provider value={{
            isOpen,
            introDone,
            setIntroDone,
            toggleMenu,
            closeMenu,
            sectionRefs,
            registerSection,
            scrollToSection,
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

// Custom hook for easier consumption
export const useLayoutProvider = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
