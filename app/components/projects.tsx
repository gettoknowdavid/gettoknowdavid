"use client";

import React, {useEffect, useRef} from "react";
import {useLayoutProvider} from "@/components/layout-context";
import Link from "next/link";
import {fakeProjects} from "@/lib/fake-projects";

export const Projects = () => {
    const {registerSection, unregisterSection} = useLayoutProvider();
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            registerSection('projects', sectionRef.current);
        }
        // Cleanup on unmount
        return () => unregisterSection('projects');
    }, [registerSection, unregisterSection]);

    return (
        <section
            id={'projects'}
            ref={sectionRef}
            className='h-screen grid app-margin w-full gap-4 grid--app-columns'
        >
            <div className='mt-11 content flex flex-col gap-8'>
                <div className='flex items-center gap-4'>
                    <h1 className="text-nowrap uppercase tracking-widest text-sm">Recent Projects</h1>
                    <span className="h-px w-full bg-accent"/>
                </div>
                <ul className="pt-4 pb-12 flex flex-col gap-12">
                    {fakeProjects.map((project) => (
                        <ProjectItem key={project.id} project={project}/>
                    ))}
                </ul>
            </div>
        </section>
    );
};

const ProjectItem = ({project}: { project: typeof fakeProjects[0] }) => {
    return (
        <li>
            <Link
                href={`/projects/${project.slug}`}
                className="inline-block w-fit hover:text-accent text-white transition-all duration-600 ease-in-out"
            >
                <h2 className={`text-7xl font-thin`}>{project.title}</h2>
            </Link>
            <p className="font-regular tracking-wide text-neutral-300">{project.brief}</p>
            <small className="text-xs tracking-widest uppercase text-neutral-300">
                {project.tools}
            </small>
        </li>
    );
}