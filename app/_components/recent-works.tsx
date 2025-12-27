'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {WorksList, WorksListSkeleton} from "@/app/works/_components/works-list";
import {useSuspenseQuery} from "@apollo/client/react";
import {GET_WORKS} from "@/app/graphql/get-works";
import React from "react";

export const RecentWorks = () => {
    const {data} = useSuspenseQuery(GET_WORKS, {variables: {limit: 4}});
    const works = data?.workCollection.works || [];

    return (
        <div className='flex flex-col gap-8 mb-16'>
            <div className='flex items-center gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">Work Experience</h1>
                <span className="h-px w-full bg-accent/90"/>
                <Button variant="link" className="text-neutral-200 p-0" asChild>
                    <Link href="/works">
                        See more
                    </Link>
                </Button>
            </div>
            <React.Suspense fallback={<WorksListSkeleton/>}>
                <WorksList works={works}/>
            </React.Suspense>
        </div>
    );
}