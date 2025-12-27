import {Intro} from "@/app/_components/intro";
import React from "react";
import {RecentWorks} from "@/app/_components/recent-works";

export default function HomePage() {
    return (
        <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
            <div className='content'>
                <Intro/>
                <RecentWorks/>
            </div>
        </section>
    );
}
