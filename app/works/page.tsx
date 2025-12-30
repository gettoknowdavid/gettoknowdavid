import React from "react";
import {WorksList} from "@/app/works/_components/works-list";
import {getWorks} from "@/lib/queries/get-works";
import {getContact} from "@/lib/queries/get-contact";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function WorksPage() {
    const works = await getWorks();
    const resumeLink = await getContact('resume');

    if (!works || works.length === 0) {
        return (
            <div className='flex flex-col gap-8 py-24'>
                <div className='flex items-center justify-between gap-4'>
                    <h1 className="text-nowrap uppercase tracking-widest text-base">My Works</h1>
                </div>
                <h1>Nothing Found</h1>
            </div>
        );
    }


    return (
        <div className='flex flex-col gap-10 py-24'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">My Works</h1>
                {resumeLink && (
                    <Button variant="link" size="sm" className="max-sm:text-xs underline p-0 hover:opacity-40"
                            asChild>
                        <Link href={resumeLink.link} target="_blank" rel="noopener noreferrer">
                            Get my Resume
                        </Link>
                    </Button>
                )}
            </div>
            <WorksList works={works}/>
        </div>
    );
}
