import {Intro, IntroSkeleton} from "@/app/_components/intro";
import React, {Suspense} from "react";
import {RecentWorks, RecentWorksSkeleton} from "@/app/_components/recent-works";
import {References, ReferencesSkeleton} from "@/app/_components/references";
import {getHero} from "@/lib/queries/get-hero";
import {getWorks} from "@/lib/queries/get-works";
import {getReferences} from "@/lib/queries/get-references";
import {getContact} from "@/lib/queries/get-contact";
import {getContacts} from "@/lib/queries/get-contacts";
import {Contacts, ContactsSkeleton} from "@/app/_components/contacts";

export default function HomePage() {
    const hero = getHero();
    const recentWorks = getWorks(5);
    const references = getReferences(6);
    const resumeContactLink = getContact('resume');
    const contactLinks = getContacts();

    return (
        <section className='grid app-margin w-full items-center grid--app-columns'>
            <div className='content'>
                <Suspense fallback={<IntroSkeleton/>}>
                    <Intro data={hero}/>
                </Suspense>

                <Suspense fallback={<RecentWorksSkeleton/>}>
                    <RecentWorks data={recentWorks} resumeContactLink={resumeContactLink}/>
                </Suspense>

                <Suspense fallback={<ReferencesSkeleton/>}>
                    <References data={references}/>
                </Suspense>

                <Suspense fallback={<ContactsSkeleton/>}>
                    <Contacts data={contactLinks}/>
                </Suspense>
            </div>
        </section>
    );
}
