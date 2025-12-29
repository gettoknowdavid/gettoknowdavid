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

        <Card className="grid cols-span-1 border-none bg-transparent m-0 p-0 gap-0">
            <CardHeader className="gap-1 p-0 mb-6">
                <CardTitle className="flex items-start justify-between text-xl md:text-2xl lg:text-3xl font-normal">
                    <Link href={`/works/${work.slug}`} className="hover:underline transition-all duration-700">
                        {work.title}
                    </Link>
                </CardTitle>
                <div>
                    <p className="text-xs md:text-sm text-neutral-300">
                        {`${work.role} — ${work.client}`}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-300 mb-0">{range}</p>
                </div>
            </CardHeader>
            <CardContent className="max-md:text-sm tracking-wide p-0 mb-2">{work.brief}</CardContent>
            <CardFooter className="p-0 mb-0">
                <ul className="flex flex-row flex-wrap gap-1 text-neutral-400">
                    {work.toolsShort.map((tool, i) =>
                        <li
                            key={i}
                            className="flex flex-row items-center after:content-[','] after:text-xs after:md:text-sm last:after:hidden"
                        >
                            <small className="text-xs md:text-sm font-normal tracking-wide ">
                                {tool}
                            </small>
                        </li>
                    )}
                </ul>
            </CardFooter>
        </Card>
    );
}


export const WorkItemSkeleton = () => {
    return (
        <Card className="grid cols-span-1 border-none bg-transparent m-0 p-0 gap-0">
            <CardHeader className="gap-1 p-0 mb-6">
                <Skeleton className="h-9 w-3/4"/>
                <div className="space-y-1">
                    <Skeleton className="h-4 w-64"/>
                    <Skeleton className="h-4 w-20"/>
                </div>
            </CardHeader>
            <CardContent className="p-0 mb-3">
                <div className="space-y-1">
                    <Skeleton className="h-5 w-full"/>
                    <Skeleton className="h-5 w-5/6"/>
                </div>
            </CardContent>
            <CardFooter className="p-0 mb-0">
                <div className="flex flex-row flex-wrap gap-1">
                    <Skeleton className="h-4 w-16"/>
                    <Skeleton className="h-4 w-20"/>
                    <Skeleton className="h-4 w-24"/>
                    <Skeleton className="h-4 w-12"/>
                </div>
            </CardFooter>
        </Card>
    );
}