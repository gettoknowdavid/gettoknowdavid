'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {WorksList, WorksListSkeleton} from "@/app/works/_components/works-list";
import React, {use} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Work} from "@/type";

export const RecentWorks = ({data}: { data: Promise<Work[]> }) => {
    const works = use(data);

    return (
        <div className='flex flex-col gap-8 lg:h-screen pb-24 justify-center'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">Work Experience</h1>
                <Button variant="link" className="underline p-0 hover:opacity-40" asChild>
                    <Link href="/works">
                        See more
                    </Link>
                </Button>
            </div>
            <WorksList works={works}/>
        </div>
    );
}

export const RecentWorksSkeleton = () => {
    return (
        <div className='flex flex-col gap-8 lg:h-screen pb-24'>
            <div className='flex items-center justify-between gap-4'>
                <Skeleton className="h-6 w-40"/>
                <Skeleton className="h-3.5 w-14"/>
            </div>
            <WorksListSkeleton/>
        </div>
    );
}