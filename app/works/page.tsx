import React from "react";
import {WorksList} from "@/app/works/_components/works-list";
import makeClient from "@/app/client";
import {GET_WORKS} from "@/app/_graphql/get-works";

export default async function WorksPage() {
    const client = makeClient();
    const {data} = await client.query({query: GET_WORKS});

    if (!data) {
        return (
            <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
                <div className='flex flex-col content mt-24'>
                    <h1>Nothing Found</h1>
                </div>
            </section>
        );
    }


    return (
        <div className='flex flex-col gap-8 py-16'>
            <div className='flex items-center gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">My Works</h1>
            </div>
            <WorksList works={data.workCollection.works}/>
        </div>
    );
}
;