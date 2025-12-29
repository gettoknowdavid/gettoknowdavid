import React from "react";
import {ShotsList} from "@/app/shots/_components/shots-list";

export default function ShotsPage() {
    return (
        <div className='flex flex-col gap-8 pb-16'>
            <ShotsList/>
        </div>
    );
}
