'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {WorksList, WorksListSkeleton} from "@/app/works/_components/works-list";
import React, {use} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Contact, Work} from "@/type";

type RecentWorksProps = {
    data: Promise<Work[]>;
    resumeContactLink: Promise<Contact | undefined | null>;
}

export const RecentWorks = ({data, resumeContactLink}: RecentWorksProps) => {
    const works = use(data);
    const resumeLink = use(resumeContactLink);

    return (
        <div className='flex flex-col gap-8 lg:h-screen pb-24 justify-center'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">Work Experience</h1>
                {resumeLink && (
                    <Button variant="link" size="sm" className="max-sm:text-xs underline p-0 hover:opacity-40" asChild>
                        <Link href={resumeLink.link} target="_blank" rel="noopener noreferrer">
                            Get my Resume
                        </Link>
                    </Button>
                )}
            </div>
            <WorksList works={works}/>
            <div className="flex items-center justify-end">
                <Button variant="link" size="sm" className="max-sm:text-xs underline p-0 hover:opacity-40" asChild>
                    <Link href="/works">
                        See more
                    </Link>
                </Button>
            </div>
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