'use client';

import React, {use} from "react";
import {Reference} from "@/type";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";

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

const ReferenceItem = ({reference}: { reference: Reference }) => {
    return (
        <li className="flex flex-col gap-2.5">
            <blockquote className="font-normal text-xl md:text-3xl">
                <p className={`before:content-['"'] after:content-['"'] before:text-neutral-400 after:text-neutral-400`}>
                    {reference.content}
                </p>
            </blockquote>
            <div
                className="flex gap-2 text-base text-foreground">
                <Link
                    href={reference.refereeLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="underline hover:text-neutral-400 transition-all duration-700 ease-in-out"
                >
                    {reference.refereeName}
                </Link>
                <p className="text-neutral-400"> {reference.refereeRole} </p>
            </div>
        </li>
    );
}

export const ReferencesSkeleton = () => {
    return (
        <div className='flex flex-col gap-8 lg:h-screen justify-center pb-24'>
            <Skeleton className="h-5 w-24"/>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {Array.from({length: 6}).map((_, index) => (
                    <li key={index} className="flex flex-col gap-2.5">
                        <div className="space-y-3">
                            <Skeleton className="h-7 md:h-9 w-full"/>
                            <Skeleton className="h-7 md:h-9 w-full"/>
                            <Skeleton className="h-7 md:h-9 w-4/5"/>
                        </div>
                        <div className="flex gap-2 mt-1">
                            <Skeleton className="h-5 w-32"/>
                            <Skeleton className="h-5 w-40"/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}