'use client';

import React from "react";
import {useLayoutProvider} from "@/components/layout-context";

export const ContactSection = () => {
    // Get the register function from context
    const {registerSection} = useLayoutProvider();

    // Create a ref for the section's root element
    const sectionRef = React.useRef<HTMLDivElement>(null);

    // Register the element on mount
    React.useEffect(() => {
        if (sectionRef.current) registerSection('contact', sectionRef.current);
    }, [registerSection]);

    return (
        <section
            id='contact'
            ref={sectionRef}
            className='h-screen w-full flex flex-col gap-8'
        >
            <h1 className='text-6xl tracking-tight'>
                Contact <br/>A <span className='text-accent'>frontend engineer</span>.
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