// noinspection JSUnusedGlobalSymbols

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {ReactNode} from "react";
import {BLOCKS} from "@contentful/rich-text-types";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import type {Metadata} from "next";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {BackButton} from "@/components/back-button";
import {WorkGallery} from "@/app/works/_components/work-gallery";
import {longDatesFormatter} from "@/lib/date-formatter";
import {WorkLinkIcon} from "@/app/works/_components/work-link-icon";
import {getWorks} from "@/lib/queries/get-works";
import {getWork} from "@/lib/queries/get-work";
import {siteConfig} from "@/config/site";


export async function generateStaticParams() {
    const works = await getWorks();
    return works.map((work) => ({slug: work.slug}));
}

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    const work = await getWork(slug);

    if (!work) {
        return {
            title: 'Work Not Found',
        };
    }

    return {
        title: {
            default: `${work.title} • ${siteConfig.name}`,
            template: `%s - ${siteConfig.name}`,
        },
        description: work.brief,
        openGraph: {
            title: work.title,
            description: work.brief,
            images: work.image ? [{url: work.image.url}] : [],
        },
    };
}


export default async function WorkDetails({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const work = await getWork(slug);

    if (!work) {
        return (
            <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
                <div className='flex flex-col content mt-24'>
                    <h1>No Project Found</h1>
                </div>
            </section>
        );
    }

    const options = {
        preserveWhitespace: true,
        renderNode: {
            [BLOCKS.HEADING_5]: (_node: any, children: any) => (
                <CardHeader>
                    <CardTitle>{children}</CardTitle>
                </CardHeader>
            ),
            [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
                <CardContent>
                    <p className="leading-loose text-base">{children}</p>
                </CardContent>
            ),
        },
        renderText: (text: string): ReactNode => {
            return text.split("\n").flatMap((textSegment, index) => {
                return index === 0 ? [textSegment] : [<br key={`br-${index}`}/>, textSegment];
            });
        },
    };

    const keyFeatureOptions = {
        preserveWhitespace: true,
        renderNode: {
            [BLOCKS.HEADING_5]: (_node: any, children: any) => (
                <CardHeader>
                    <CardTitle>{children}</CardTitle>
                </CardHeader>
            ),
            [BLOCKS.UL_LIST]: (_node: any, children: any) => (
                <CardContent>
                    <ul className="flex flex-col ml-4 list-disc">{children}</ul>
                </CardContent>
            ),
            [BLOCKS.LIST_ITEM]: (_node: any, children: any) => (
                <li className="leading-loose text-base">
                    {children}
                </li>
            ),
        },
        renderText: (text: string): ReactNode => {
            return text.split("\n").flatMap((textSegment, index) => {
                return index === 0 ? [textSegment] : [<br key={`br-${index}`}/>, textSegment];
            });
        },
    };

    const formattedStartDate = longDatesFormatter(work.startDate);
    const formattedEndDate = longDatesFormatter(work.endDate);
    const hasGallery = work.galleryCollection && work.galleryCollection.items.length > 0;


    return (
        <div className='grid py-16 lg:py-24 relative'>
            <div className="flex mb-4 relative lg:absolute lg:-left-14 lg:top-24">
                <BackButton/>
            </div>
            <Card
                className="relative overflow-hidden bg-background border-none min-h-[320px] flex flex-col justify-end">
                {work.image && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={work.image.url}
                            alt={work.image.alt || work.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"/>
                    </div>
                )}
                <CardHeader className="relative">
                    <h1 className="text-2xl md:text-3xl lg:text-6xl font-regular lg:font-thin">{work.title}</h1>
                    <h2 className="text-base mt-1 md:mt-3">{work.subtitle}</h2>
                    <p className="text-sm md:text-base text-neutral-300">{work.brief}</p>
                </CardHeader>
            </Card>
            <div className='grid md:grid-cols-12 items-start h-full'>
                <div className="grid md:col-span-8">
                    <Card className="w-full bg-background border-none gap-2">
                        {documentToReactComponents(work.description.json, options)}
                        <span className="h-5"/>
                        {documentToReactComponents(work.keyFeatures.json, keyFeatureOptions)}
                    </Card>
                </div>
                <div className="grid md:col-span-4">
                    <Card className="w-full bg-background border-none gap-2">
                        <CardHeader className="py-0 my-0 mb-0">
                            <CardTitle className="py-0 my-0 mb-0">Project Details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-neutral-400">Client</p>
                                <p className="text-base">{work.client}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-400">Timeline</p>
                                <p className="text-base">{formattedStartDate} - {formattedEndDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-400">Role</p>
                                <p className="text-base">{work.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full bg-background border-none gap-2">
                        <CardHeader>
                            <CardTitle>Technologies & Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {work.tools.map((tool, index) =>
                                    <li key={index}
                                        className="flex flex-row text-base items-center after:content-[','] last:after:hidden">
                                        {tool}
                                    </li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="w-full bg-background border-none gap-2">
                        <CardHeader>
                            <CardTitle>Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {work.linksCollection.items.map((link, index) =>
                                    <Button key={index} variant="outline" size="sm" asChild>
                                        <Link href={link.link} target="_blank" rel="noopener noreferrer">
                                            <WorkLinkIcon link={link}/> {link.type}
                                        </Link>
                                    </Button>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {hasGallery && <WorkGallery items={work.galleryCollection!.items}/>}
        </div>
    );
}
