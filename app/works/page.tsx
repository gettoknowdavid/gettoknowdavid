import React from "react";
import {WorksList} from "@/app/works/_components/works-list";
import {getWorks} from "@/lib/queries/get-works";

export default async function WorksPage() {
    const works = await getWorks();

    if (!works || works.length === 0) {
        return (
            <div className='flex flex-col gap-8 py-24'>
                <div className='flex items-center gap-4'>
                    <h1 className="text-nowrap uppercase tracking-widest text-base">My Works</h1>
                </div>
                <h1>Nothing Found</h1>
            </div>
        );
    }


    return (
        <div className='flex flex-col gap-8 py-24'>
            <div className='flex items-center gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">My Works</h1>
            </div>
            <WorksList works={works}/>
        </div>
    );
}
