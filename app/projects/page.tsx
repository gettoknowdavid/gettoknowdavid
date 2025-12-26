import React from "react";
import {ProjectsList} from "@/app/projects/_components/projects-list";

export default function ProjectsPage() {
    return (
        <div className='flex flex-col gap-8 py-16'>
            <div className='flex items-center gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-sm">Recent Projects</h1>
                <span className="h-px w-full bg-accent"/>
            </div>
            <ProjectsList/>
        </div>
    );
}
;