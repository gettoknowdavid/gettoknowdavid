"use client";

import React from "react";
import {useSuspenseQuery} from "@apollo/client/react";
import {GET_PROJECTS} from "@/app/graphql/get-projects";
import {ProjectItemT} from "@/type";
import {ProjectItem} from "@/app/projects/_components/projects-item";

export const ProjectsList = () => {
    const {data} = useSuspenseQuery(GET_PROJECTS);
    const projects = data?.workCollection.projects || [];

    return (
        <React.Suspense fallback={<ProjectsListSkeleton/>}>
            <ul className="pt-4 pb-12 flex flex-col gap-12">
                {projects.map((project: ProjectItemT) => (
                    <ProjectItem key={project.sys.id} project={project}/>
                ))}
            </ul>
        </React.Suspense>
    );
};


const ProjectsListSkeleton = () => {
    return (
        <ul className="pt-4 pb-12 flex flex-col gap-12">
            {Array.from({length: 3}).map((_, index) => (
                <li key={index} className="animate-pulse">
                    <div className="inline-block w-full">
                        <div className="h-20 bg-neutral-800 rounded-md w-2/4 mb-3"></div>
                        <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
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