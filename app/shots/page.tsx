import React from "react";
import {ShotsList} from "@/app/shots/_components/shots-list";
import {getShots} from "@/lib/queries/get-shots";

export default async function ShotsPage() {
    const initialShots = await getShots(50, 0);
    return (
        <div className='flex flex-col gap-8 pb-16'>
            <ShotsList initialShots={initialShots}/>
        </div>
    );
}
