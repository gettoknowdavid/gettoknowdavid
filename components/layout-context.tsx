"use client";

import type React from "react";
import {createContext, type ReactNode, useContext, useState} from "react";

// Define the shape of the context
interface LayoutContextType {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}

// Create the context with default values
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Define the Provider component
interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <LayoutContext.Provider value={{isOpen, toggleMenu, closeMenu}}>
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
