"use client";

import React from "react";
import {Work, WorkItemT} from "@/type";
import {WorkItem, WorkItemSkeleton} from "@/app/works/_components/works-item";

export const WorksList = ({works}: { works: Work[] | WorkItemT[] }) => {
    return (
        <ul className="grid grid-cols-2 gap-8">
            {works.map((work: WorkItemT) => (
                <WorkItem key={work.sys.id} work={work}/>
            ))}
        </ul>
    );
};


export const WorksListSkeleton = () => {
    return (
        <ul className="grid grid-cols-2 gap-8">
            {Array.from({length: 6}).map((_, index) => (
                <li key={index}>
                    <WorkItemSkeleton/>
                </li>
            ))}
        </ul>
    );
};