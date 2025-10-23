'use client';

import {GithubLogoIcon} from "@phosphor-icons/react/dist/icons/GithubLogo";
import {MapPinIcon} from "@phosphor-icons/react/dist/icons/MapPin";
import React from "react";
import Image from "next/image";
import tongueOut from "../../public/tongue-out.jpeg";

export const RecentProjects = () => {
    return (
        <section className='h-screen w-full section items-center'>
            <div className='grid col-start-5 col-end-[-1]'>
                <div className='grid-eight auto-rows-[minmax(0,1fr)]'>
                    <div className='dashboard-card col-start-1 col-end-3 aspect-square row-start-1 row-end-8'>
                        <div className='card-tag'>
                            <MapPinIcon size={12}/>
                            <h3>Location</h3>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-3 col-end-5 aspect-square row-start-1 row-end-8'>
                        <Image
                            src={tongueOut}
                            fill={true}
                            alt="Picture of the author"
                            className='rounded-lg border'
                        />
                    </div>

                    <div className='dashboard-card col-start-1 col-end-5 row-start-8 row-end-15'>
                        <div className='card-tag'>
                            <GithubLogoIcon size={12}/>
                            <h3>Github Activity</h3>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-1 row-end-6'>
                        <div className='card-tag'>
                            <GithubLogoIcon size={12}/>
                            <h3>Current Deep Dive</h3>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-8 col-end-9 row-start-1 row-end-6'>
                        <div className='card-tag'>
                            <GithubLogoIcon size={12}/>
                            <h3>Quotes</h3>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-9 row-start-6 row-end-12'>
                        <div className='card-tag'>
                            <GithubLogoIcon size={12}/>
                            <h3>Tech Stack</h3>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-9 row-start-12 row-end-15'>
                        <div className='card-tag'>
                            <GithubLogoIcon size={12}/>
                            <h3>Tools</h3>
                        </div>
                    </div>
                </div>
                {/*</div>*/}
                {/*<div className='border border-neutral-800/75 rounded-3xl p-3'>*/}
                {/*    <div className={cn(*/}
                {/*        'auto-rows-[minmax(0,1fr)] grid-cols-[repeat(36,_minmax(0,_1fr))]',*/}
                {/*        'gap-4 flex-col max-lg:grid-cols-6 max-md:flex max-md:gap-4 md:grid',*/}
                {/*    )}>*/}

                {/*        <div*/}
                {/*            className='bg-pink-400 rounded-lg relative col-start-1 col-end-11 row-start-1 row-end-[8] aspect-square max-lg:col-end-3 max-lg:row-end-3'>*/}
                {/*            <div*/}
                {/*                className='z-10 flex items-center gap-2 rounded-full border border-slate-700 bg-neutral-950/80 shrink-0 py-2 px-3 absolute left-4 top-4'>*/}
                {/*                <MapPinIcon size={12}/>*/}
                {/*                <h3 className="text-sm text-zinc-200">Location</h3>*/}
                {/*            </div>*/}
                {/*            sxbkbdvfjdksf*/}
                {/*        </div>*/}

                {/*        <div className={cn(*/}
                {/*            'grid grid-cols-3 gap-4 col-start-1 col-end-11 row-start-[7] row-end-[9]',*/}
                {/*            'max-lg:col-end-4 max-lg:row-start-3 max-lg:row-end-4'*/}
                {/*        )}>*/}
                {/*            <div className='flex flex-col relative aspect-square'>*/}
                {/*                <div*/}
                {/*                    className='rounded-xl flex flex-col grow inset-px z-[2] md:absolute border'>*/}
                {/*                    <a href="https://www.github.com/gettoknowdavid"*/}

                {/*                       className='flex size-full items-center justify-center rounded-3xl'>*/}
                {/*                        <GithubLogoIcon size={32} className='opacity-90'/>*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className='flex flex-col relative aspect-square'>*/}
                {/*                <div*/}
                {/*                    className='rounded-xl flex flex-col grow inset-px z-[2] md:absolute border'>*/}
                {/*                    <a href="https://www.x.com/gettoknowdavid"*/}
                {/*                       className='flex size-full items-center justify-center rounded-3xl'>*/}
                {/*                        <XLogoIcon size={32} className='opacity-90'/>*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className='flex flex-col relative aspect-square'>*/}
                {/*                <div*/}
                {/*                    className='rounded-xl flex flex-col grow inset-px z-[2] md:absolute border'>*/}
                {/*                    <a href="https://www.instagram.com/theakanmichael"*/}
                {/*                       className='flex size-full items-center justify-center rounded-3xl'>*/}
                {/*                        <InstagramLogoIcon size={32} className='opacity-90'/>*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
            </div>
        </section>
    )
        ;
}