"use client";

import React from "react";
import {Work, WorkItemT} from "@/type";
import {WorkItem, WorkItemSkeleton} from "@/app/works/_components/work-item";

export const WorksList = ({works}: { works: Work[] | WorkItemT[] }) => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-x-16 md:gap-y-11 lg:gap-y-20">
            {works.map((work: WorkItemT, index) => (
                <WorkItem
                    key={work.sys.id}
                    work={work}
                    isLeftColumn={index % 2 === 0}
                    isLastRow={index >= works.length - 2}
                />
            ))}
        </ul>
    );
};


export const WorksListSkeleton = () => {
    const length = 6;
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-x-16 md:gap-y-11 lg:gap-y-20">
            {Array.from({length}).map((_, index) => (
                <li key={index}>
                    <WorkItemSkeleton
                        isLeftColumn={index % 2 === 0}
                        isLastRow={index >= length - 2}
                    />
                </li>
            ))}
        </ul>
    );
};