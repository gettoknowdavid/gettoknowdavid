import {Intro} from "@/app/_components/intro";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Button} from "@/components/ui/button";

export default function HomePage() {
    return (
        <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
            <div className='content'>
                <Intro/>
                <div className='flex flex-col gap-8 mb-16'>
                    <div className='flex items-center gap-4'>
                        <h1 className="text-nowrap uppercase tracking-widest text-base">Work Experience</h1>
                        <span className="h-px w-full bg-accent/90"/>
                        <Button variant="link" className="text-neutral-200 p-0">See more</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="grid cols-span-1">
                            <Card
                                className=" bg-neutral-900 ring-1 ring-offset-8 ring-neutral-500/40 ring-offset-neutral-950">
                                <CardHeader className="gap-0">
                                    <CardTitle className="flex items-start justify-between text-xl font-normal">
                                        Franklin
                                        <span className="text-sm text-neutral-400">2024 — now</span>
                                    </CardTitle>
                                    <p className="text-sm text-neutral-400">Full-stack Developer</p>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        I currently work at Franklin, where I help build and maintain our Next.js
                                        application.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid cols-span-1">
                            <Card
                                className=" bg-neutral-900 ring-1 ring-offset-8 ring-neutral-500/40 ring-offset-neutral-950">
                                <CardHeader className="gap-0">
                                    <CardTitle className="flex items-start justify-between text-xl font-normal">
                                        Franklin
                                        <span className="text-sm text-neutral-400">2024 — now</span>
                                    </CardTitle>
                                    <p className="text-sm text-neutral-400">Full-stack Developer</p>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        I currently work at Franklin, where I help build and maintain our Next.js
                                        application.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
