'use client';

import React, {use} from "react";
import {Reference} from "@/type";
import {ReferenceItem, ReferenceItemSkeleton} from "@/app/_components/reference-item";
import {Skeleton} from "@/components/ui/skeleton";

export const References = ({data}: { data: Promise<Reference[] | undefined | null> }) => {
    const references = use(data);

    if (!references || !references.length) return null;

    return (
        <div className='flex flex-col gap-8 lg:h-screen justify-center pb-24'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">References</h1>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {references.map((reference: Reference) => (
                    <ReferenceItem key={reference.sys.id} reference={reference}/>
                ))}
            </ul>
        </div>
    );
}

export const ReferencesSkeleton = () => {
    return (
        <div className='flex flex-col gap-8 lg:h-screen justify-center pb-24'>
            <Skeleton className="h-5 w-24"/>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {Array.from({length: 6}).map((_, index) => (
                    <ReferenceItemSkeleton key={index}/>
                ))}
            </ul>
        </div>
    );
}