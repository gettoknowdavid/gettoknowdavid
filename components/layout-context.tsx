"use client";

import React, {createContext, type ReactNode, useContext, useState} from "react";

// Define the shape of the context
interface LayoutContextType {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;

    introDone: boolean;
    setIntroDone: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [introDone, setIntroDone] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);
    
    return (
        <LayoutContext.Provider value={{isOpen, introDone, setIntroDone, toggleMenu, closeMenu}}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutProvider = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};