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
        <div className='flex flex-col gap-8 mb-48'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">Work Experience</h1>
                <Button variant="link" className="underline p-0 hover:opacity-40" asChild>
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