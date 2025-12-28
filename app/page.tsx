import {Intro} from "@/app/_components/intro";
import React from "react";
import {RecentWorks} from "@/app/_components/recent-works";
import {References} from "@/app/_components/references";

export default function HomePage() {
    return (
        <section className='grid app-margin w-full items-center grid--app-columns'>
            <div className='content'>
                <Intro/>
                <RecentWorks/>
                <References/>
            </div>
        </section>
    );
}
