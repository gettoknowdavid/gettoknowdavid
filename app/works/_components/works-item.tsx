"use client";

import React from "react";
import Link from "next/link";
import {WorkItemT} from "@/type";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getYearRange} from "@/lib/date-formatter";
import {Skeleton} from "@/components/ui/skeleton";

export const WorkItem = ({work}: { work: WorkItemT }) => {
    const range = getYearRange({start: work.startDate, end: work.endDate});
    return (
        <Link href={`/works/${work.slug}`}>
            <Card className="grid cols-span-1 bg-neutral-900 ringed-card hover:bg-card transition-all duration-700">
                <CardHeader className="gap-0">
                    <CardTitle className="flex items-start justify-between text-xl font-normal">
                        {work.title}
                        <span className="text-sm text-neutral-400">{range}</span>
                    </CardTitle>
                    <p className="text-sm text-neutral-400">{work.role}</p>
                </CardHeader>
                <CardContent>{work.brief}</CardContent>
                <CardFooter>
                    <ul className="flex flex-row flex-wrap gap-1 text-neutral-400">
                        {work.toolsShort.map((tool, i) =>
                            <li key={i} className="flex flex-row items-center after:content-[','] last:after:hidden">
                                <small className="text-base font-normal tracking-wide ">
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


export const WorkItemSkeleton = () => {
    return (
        <Card className="grid cols-span-1 bg-neutral-900">
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