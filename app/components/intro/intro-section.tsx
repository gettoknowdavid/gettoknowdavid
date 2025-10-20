'use client';

import {useLayoutProvider} from "@/components/layout-context";
import {Aperture, Briefcase, UserRound} from "lucide-react";
import React from "react";

const quickLinks = [
    {
        name: "Fun facts about me",
        href: "/about",
        icon: <UserRound className='w-3.5 h-3.5'/>,
    },
    {
        name: "See my work",
        href: "/work",
        icon: <Briefcase className='w-3.5 h-3.5'/>,
    },
    {
        name: "View my shots",
        href: "/shots",
        icon: <Aperture className='w-3.5 h-3.5'/>,
    },
];

// grid-cols-[repeat(36,_minmax(0,_1fr))] gap-4 flex-col max-lg:grid-cols-6 max-md:flex max-md:gap-4 md:grid
export const IntroSection = () => {

    // Get the register function from context
    const {registerSection} = useLayoutProvider();

    // Create a ref for the section's root element
    const sectionRef = React.useRef<HTMLDivElement>(null);

    // Register the element on mount
    React.useEffect(() => {
        if (sectionRef.current) registerSection('#', sectionRef.current);
    }, [registerSection]);

    return (
        <section
            id='#'
            ref={sectionRef}
            className='h-screen w-full flex flex-col justify-center gap-8 px-4 md:px-12 py-14'
        >
            <h1 className='text-4xl md:text-7xl lg:text-8xl tracking-tight'>
                Hi, I'm David.
                <br/>A <span className='text-accent'>frontend engineer</span>.
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-14 md:grid-8'>
                <h2 className='text-2xl md:text-2xl lg:text-3xl max-w-2xl leading-relaxed '>
                    Passionate about building functional websites and mobile applications
                    that help people. Beyond coding, I enjoy photography and music.
                </h2>
                <div className='hidden h-2xl'>
                    <div className='h-full border-2 border-border rounded-lg'>
                        s
                    </div>
                </div>
            </div>
        </section>
    );
}