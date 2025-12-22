"use client";

import React, {useEffect, useRef} from "react";
import {useLayoutProvider} from "@/components/layout-context";
import Link from "next/link";
import {useSuspenseQuery} from "@apollo/client/react";
import {GET_PROJECTS} from "@/app/graphql/get-projects";
import {ProjectItemT} from "@/type";

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
                <React.Suspense fallback={<ProjectsListSkeleton/>}>
                    <ProjectsList/>
                </React.Suspense>
            </div>
        </section>
    );
};

const ProjectsList = () => {
    const {data} = useSuspenseQuery(GET_PROJECTS);
    const projects = data?.workCollection.projects || [];

    return (
        <ul className="pt-4 pb-12 flex flex-col gap-12">
            {projects.map((project: ProjectItemT) => (
                <ProjectItem key={project.sys.id} project={project}/>
            ))}
        </ul>
    );
};

const ProjectItem = ({project}: { project: ProjectItemT }) => {
    return (
        <li>
            <Link
                href={`/projects/${project.slug}`}
                className="inline-block w-fit hover:text-accent text-white transition-all duration-600 ease-in-out"
            >
                <h2 className={`text-7xl font-thin`}>{project.title}</h2>
            </Link>
            <p className="mt-3 text-base font-medium tracking-wide text-neutral-300">{project.brief}</p>
            <ul className="flex flex-row gap-2">
                {project.tools.map((tool, index) =>
                    <li key={index}
                        className="flex flex-row items-center after:content-['•'] gap-2 last:after:hidden">
                        <small className="text-xs tracking-widest font-medium uppercase text-neutral-300">
                            {tool}
                        </small>
                    </li>
                )}
            </ul>
        </li>
    );
}


const ProjectsListSkeleton = () => {
    return (
        <ul className="pt-4 pb-12 flex flex-col gap-12">
            {Array.from({length: 3}).map((_, index) => (
                <li key={index} className="animate-pulse">
                    <div className="inline-block w-full">
                        {/* Title skeleton */}
                        <div className="h-20 bg-neutral-800 rounded-md w-2/4 mb-3"></div>
                        {/* Brief skeleton */}
                        <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
                        {/* Tools skeleton */}
                        <div className="flex flex-row gap-2">
                            <div className="h-3 bg-neutral-800 rounded w-20"></div>
                            <div className="h-3 bg-neutral-800 rounded w-24"></div>
                            <div className="h-3 bg-neutral-800 rounded w-16"></div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};