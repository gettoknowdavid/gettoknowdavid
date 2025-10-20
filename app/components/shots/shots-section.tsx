'use client';

import {useLayoutProvider} from "@/components/layout-context";
import React from "react";

export const ShotsSection = () => {
    // Get the register function from context
    const {registerSection} = useLayoutProvider();

    // Create a ref for the section's root element
    const sectionRef = React.useRef<HTMLDivElement>(null);

    // Register the element on mount
    React.useEffect(() => {
        if (sectionRef.current) registerSection('shots', sectionRef.current);
    }, [registerSection]);

    return (
        <section
            id='shots'
            ref={sectionRef}
            className='h-screen w-full flex flex-col gap-8'
        >
            <h1 className='text-6xl tracking-tight'>
                Shots <br/>A <span className='text-accent'>frontend engineer</span>.
            </h1>

            <h2 className='leading-relaxed'>
                Passionate about building functional websites and mobile applications
                that help people. Beyond coding, I enjoy photography and music.
            </h2>

            <div className='flex flex-col justify-start mt-8'>
                <h3 className='uppercase text-sm mb-3'>Where you can start</h3>

            </div>
        </section>
    );
}