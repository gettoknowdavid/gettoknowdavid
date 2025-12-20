'use client';

import {GithubLogoIcon} from "@phosphor-icons/react/dist/icons/GithubLogo";
import React from "react";
import Image from "next/image";
import tongueOut from "../../public/tongue-out.jpeg";
import {StackIcon} from "@phosphor-icons/react/dist/icons/Stack";
import {ToolboxIcon} from "@phosphor-icons/react/dist/icons/Toolbox";

import flutterIcon from '../../public/flutter.svg';
import dartIcon from '../../public/dart.svg';
import reactIcon from '../../public/react.svg';
import kotlinIcon from '../../public/kotlin.svg';
import firebaseIcon from '../../public/firebase.svg';
import {GithubContributionGraph} from "@/app/components/github-contributions-graph";

export const RecentProjects = () => {
    return (
        <section className='h-screen grid app-margin w-full gap-4 items-center grid--app-columns'>
            <div className='flex flex-col content gap-8'>
                <div
                    className='w-full bg-pink-300 grid-cols-[repeat(36,_minmax(0,_1fr))] gap-4 flex-col auto-rows-[minmax(0,1fr)] max-lg:grid-cols-6 max-md:flex max-md:gap-4 md:grid'>
                    {/*<div className='dashboard-card relative col-start-1 col-end-11 row-start-1 row-end-[8] aspect-square max-lg:col-end-3 max-lg:row-end-3'>*/}
                    {/*    /!*<div className='dashboard-card col-start-1 col-end-11 aspect-square row-start-1 row-end-8'>*!/*/}
                    {/*    <div className='dashboard-card-content'>*/}
                    {/*        <div className='relative flex flex-col items-baseline h-full px-3 pb-5 pt-3 gap-3'>*/}
                    {/*            <div className='card-tag'>*/}
                    {/*                <MapPinIcon size={12}/>*/}
                    {/*                <h3>Location</h3>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div
                        className='dashboard-card relative col-start-1 col-end-11 row-start-1 row-end-[8] aspect-square max-lg:col-end-3 max-lg:row-end-3'>
                        <div className='dashboard-card-content'>
                            <Image
                                src={tongueOut}
                                fill={true}
                                alt="Picture of the author"
                                className='rounded-3xl border'
                            />
                        </div>
                    </div>
                    <div className='dashboard-card col-start-1 col-end-5 row-start-8 row-end-15'>
                        <GithubContributionGraph/>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-1 row-end-6'>
                        <div className='dashboard-card-content'>
                            <div className='card-tag'>
                                <GithubLogoIcon size={12}/>
                                <h3>Current Deep Dive</h3>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-6 row-end-12'>
                        <div className='dashboard-card-content'>
                            <div className='relative flex flex-col items-baseline h-full px-3 pb-5 pt-3 gap-3'>
                                <div className='card-tag'>
                                    <StackIcon size={12}/>
                                    <h3>Tech Stack</h3>
                                </div>
                            </div>
                            <div className='flex grow'>
                                <div
                                    className='relative flex w-full flex-col items-center justify-center overflow-hidden md:shadow-xl'>
                                    <div
                                        className="group flex overflow-hidden p-2 gap-8 flex-row">
                                        <div className="tech-stack-component">
                                            <Image src={flutterIcon} alt='Flutter Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={dartIcon} alt='Dart Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={reactIcon} alt='React Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={kotlinIcon} alt='Kotlin Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={firebaseIcon} alt='Firebase Icon' unoptimized/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 p-4">
                                <p className="text-lg">Languages & Tools I'm familiar with</p>
                                <p className="text-sm text-gray-300">
                                    Primarily focused on mobile development with Flutter and Kotlin, but always
                                    eager to explore and learn new technologies.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-12 row-end-15'>
                        <div className='dashboard-card-content'>
                            <div className='relative flex flex-col items-baseline h-full px-3 pb-5 pt-3 gap-3'>
                                <div className='card-tag'>
                                    <ToolboxIcon size={12}/>
                                    <h3>Tools</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
        ;
}