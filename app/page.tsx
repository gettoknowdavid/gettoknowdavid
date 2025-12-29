import {Intro} from "@/app/_components/intro/intro";
import React, {Suspense} from "react";
import {RecentWorks} from "@/app/_components/recent-works";
import {References} from "@/app/_components/references";
import {getHero} from "@/lib/queries/get-hero";
import {IntroSkeleton} from "@/app/_components/intro/intro-skeleton";

export default function HomePage() {
    const hero = getHero();

    return (
        <section className='grid app-margin w-full items-center grid--app-columns'>
            <div className='content'>
                <Suspense fallback={<IntroSkeleton/>}>
                    <Intro data={hero}/>
                </Suspense>

                <RecentWorks/>
                <References/>
            </div>
        </section>
    );
}
