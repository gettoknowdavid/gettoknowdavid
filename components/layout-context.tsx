"use client";

import React, {createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState} from "react";
import {animate} from "framer-motion";

// Define the shape of the context
interface LayoutContextType {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;

    activeSection: string;
    setActiveSection: (id: string) => void;

    introDone: boolean;
    setIntroDone: (v: boolean) => void;

    sectionRefs: React.RefObject<Map<string, HTMLElement>>;
    registerSection: (id: string, element: HTMLElement) => void;
    unregisterSection: (id: string) => void;
    scrollToSection: (id: string) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [introDone, setIntroDone] = useState(false);
    const [activeSection, setActiveSection] = useState("intro"); // Default to first section

    const sectionRefs = useRef(new Map<string, HTMLElement>());
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const throttleTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    // Initialize Observer with improved settings
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Only update active section if user is not programmatically scrolling
                if (isScrollingRef.current) return;

                // Find the entry with the highest intersection ratio
                let maxEntry = entries[0];
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > maxEntry.intersectionRatio) {
                        maxEntry = entry;
                    }
                });

                // Update active section to the most visible one
                if (maxEntry.isIntersecting && maxEntry.intersectionRatio > 0) {
                    setActiveSection(maxEntry.target.id);
                }
            },
            {
                root: null,
                // Adjust for header height (56px = h-14 = 3.5rem)
                rootMargin: "-80px 0px -40% 0px",
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
            }
        );

        return () => {
            observerRef.current?.disconnect();
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            if (throttleTimeoutRef.current) {
                clearTimeout(throttleTimeoutRef.current);
            }
        };
    }, []);

    // Backup: Manual scroll detection for edge cases
    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;

            // Throttle to avoid excessive updates
            if (throttleTimeoutRef.current) return;

            throttleTimeoutRef.current = setTimeout(() => {
                throttleTimeoutRef.current = undefined;

                // Find which section is currently most visible
                const sections = Array.from(sectionRefs.current.entries());
                let closestSection = sections[0];
                let minDistance = Infinity;

                const viewportMiddle = window.scrollY + window.innerHeight / 3;

                sections.forEach(([id, element]) => {
                    const rect = element.getBoundingClientRect();
                    const elementMiddle = rect.top + window.scrollY + rect.height / 2;
                    const distance = Math.abs(viewportMiddle - elementMiddle);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSection = [id, element];
                    }
                });

                if (closestSection) {
                    setActiveSection(closestSection[0]);
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (throttleTimeoutRef.current) {
                clearTimeout(throttleTimeoutRef.current);
            }
        };
    }, []);

    // Register section with cleanup
    const registerSection = useCallback((id: string, element: HTMLElement) => {
        if (!element) return;

        sectionRefs.current.set(id, element);

        if (observerRef.current) {
            observerRef.current.observe(element);
        }
    }, []);

    // Unregister section on unmount
    const unregisterSection = useCallback((id: string) => {
        const element = sectionRefs.current.get(id);
        if (element && observerRef.current) {
            observerRef.current.unobserve(element);
        }
        sectionRefs.current.delete(id);
    }, []);

    // Improved scroll handler with immediate active state update
    const scrollToSection = useCallback((id: string) => {
        const element = sectionRefs.current.get(id);
        if (!element) return;

        // Immediately update active section for instant UI feedback
        setActiveSection(id);

        // Flag that we're programmatically scrolling
        isScrollingRef.current = true;

        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        const currentY = window.scrollY;
        // Account for header height (56px)
        const headerOffset = 56;
        const targetY = element.offsetTop - headerOffset;

        animate(currentY, targetY, {
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.8,
            onUpdate: (latest) => window.scrollTo(0, latest),
            onComplete: () => {
                // Re-enable observer after animation completes
                scrollTimeoutRef.current = setTimeout(() => {
                    isScrollingRef.current = false;
                }, 150);
            },
        });
    }, []);

    return (
        <LayoutContext.Provider value={{
            isOpen,
            introDone,
            setIntroDone,
            toggleMenu,
            closeMenu,
            sectionRefs,
            registerSection,
            unregisterSection,
            scrollToSection,
            activeSection,
            setActiveSection,
        }}>
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