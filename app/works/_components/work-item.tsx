"use client";

import React from "react";
import Link from "next/link";
import {WorkItemT} from "@/type";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getYearRange} from "@/lib/date-formatter";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

export type WorkItemProps = {
    work: WorkItemT;
    isLeftColumn?: boolean;
    isLastRow?: boolean;
}
export  type WorkItemSkeletonProps = Pick<WorkItemProps, 'isLastRow' | 'isLeftColumn'>;

export const WorkItem = (props: WorkItemProps) => {
    const {work, isLastRow, isLeftColumn} = props;
    const range = getYearRange({start: work.startDate, end: work.endDate});
    return (
        <Link href={`/works/${work.slug}`}>
            <Card
                className={cn(
                    "grid cols-span-1 border-0 hover:bg-neutral-900 transition-all duration-700",
                    isLeftColumn && "border-r",
                    !isLastRow && "border-b",
                )}
            >
                <CardHeader className="gap-0">
                    <CardTitle className="flex items-start justify-between text-xl font-normal">
                        {work.title}
                        <span className="text-sm text-neutral-400">{range}</span>
                    </CardTitle>
                    <p className="text-sm text-neutral-400">
                        {`${work.role} — ${work.client}`}
                    </p>
                </CardHeader>
                <CardContent className="text-base tracking-wide">{work.brief}</CardContent>
                <CardFooter>
                    <ul className="flex flex-row flex-wrap gap-1 text-neutral-400">
                        {work.toolsShort.map((tool, i) =>
                            <li key={i} className="flex flex-row items-center after:content-[','] last:after:hidden">
                                <small className="text-sm font-normal tracking-wide ">
                                    {tool}
                                </small>
                            </li>
                        )}
                    </ul>
                </CardFooter>
            </Card>
        </Link>
    );
}


export const WorkItemSkeleton = (props: WorkItemSkeletonProps) => {
    return (
        <Card
            className={cn(
                "grid cols-span-1 border-0 hover:bg-neutral-900 transition-all duration-700",
                props.isLeftColumn && "border-r",
                !props.isLastRow && "border-b",
            )}
        >
            <CardHeader className="gap-0">
                <div className="flex items-start justify-between">
                    <Skeleton className="h-7 w-3/4"/>
                    <Skeleton className="h-5 w-20"/>
                </div>
                <Skeleton className="h-4 w-1/2 mt-2"/>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-5/6"/>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row flex-wrap gap-2">
                    <Skeleton className="h-4 w-16"/>
                    <Skeleton className="h-4 w-20"/>
                    <Skeleton className="h-4 w-24"/>
                    <Skeleton className="h-4 w-16"/>
                </div>
            </CardFooter>
        </Card>
    );
}