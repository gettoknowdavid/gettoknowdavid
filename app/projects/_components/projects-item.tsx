"use client";

import React from "react";
import Link from "next/link";
import {ProjectItemT} from "@/type";

export const ProjectItem = ({project}: { project: ProjectItemT }) => {
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

