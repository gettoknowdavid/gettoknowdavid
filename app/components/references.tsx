'use client';

import {useSuspenseQuery} from "@apollo/client/react";
import {GET_REFERENCES} from "@/app/graphql/get-references";
import React from "react";
import {Reference} from "@/type";
import {ReferenceItem, ReferenceItemSkeleton} from "@/app/components/reference-item";

export const References = () => {
    const {data} = useSuspenseQuery(GET_REFERENCES, {variables: {limit: 6}});
    const references = data?.referenceCollection.items || [];

    return (
        <div className='flex flex-col gap-8 h-screen justify-center'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">References</h1>
            </div>
            <React.Suspense fallback={<ReferencesListSkeleton/>}>
                <ReferencesList references={references}/>
            </React.Suspense>
        </div>
    );
}

export const ReferencesList = ({references}: { references: Reference[] }) => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {references.map((reference: Reference) => (
                <ReferenceItem key={reference.sys.id} reference={reference}/>
            ))}
        </ul>
    );
}

export const ReferencesListSkeleton = () => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {Array.from({length: 6}).map((_, index) => (
                <ReferenceItemSkeleton key={index}/>
            ))}
        </ul>
    );
}