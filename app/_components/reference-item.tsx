import React from "react";
import {Reference} from "@/type";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";

export const ReferenceItem = ({reference}: { reference: Reference }) => {
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

export const ReferenceItemSkeleton = () => {
    return (
        <li className="flex flex-col gap-2.5">
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
    );
}