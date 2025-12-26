import {GET_PROJECT} from "@/app/graphql/get-project";
import makeClient from "@/app/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {ReactNode} from "react";
import {BLOCKS} from "@contentful/rich-text-types";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import type {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {Button} from "@/components/ui/button";
import {ProjectLinkIcon} from "@/components/project-link-icon";
import Link from "next/link";
import Image from "next/image";
import {BackButton} from "@/components/back-button";
import {AssetT} from "@/type";

export const metadata: Metadata = {
    title: {
        default: `My Projects • ${siteConfig.name}`,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/icon.png",
    },
};

export default async function ProjectDetails({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const client = makeClient();
    const {data, error} = await client.query({
        query: GET_PROJECT,
        variables: {slug},
        context: {fetchOptions: {next: {revalidate: 3600}}},
    });


    if (!data) {
        return (
            <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
                <div className='flex flex-col content mt-24'>
                    <h1>No Project Found</h1>
                </div>
            </section>
        );
    }

    const project = data.workCollection.items[0];

    const options = {
        preserveWhitespace: true,
        renderNode: {
            [BLOCKS.HEADING_5]: (node: any, children: any) => (
                <CardHeader>
                    <CardTitle>{children}</CardTitle>
                </CardHeader>
            ),
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
                <CardContent>
                    <p className="leading-relaxed text-base">{children}</p>
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
            [BLOCKS.HEADING_5]: (node: any, children: any) => (
                <CardHeader>
                    <CardTitle>{children}</CardTitle>
                </CardHeader>
            ),
            [BLOCKS.UL_LIST]: (node: any, children: any) => (
                <CardContent>
                    <ul className="flex flex-col ml-4 list-disc">{children}</ul>
                </CardContent>
            ),
            [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
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

    const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "short"});
    const startDate = Date.parse(project.startDate);
    const endDate = Date.parse(project.endDate);
    const formattedStartDate = dateFormatter.format(startDate);
    const formattedEndDate = dateFormatter.format(endDate);

    const hasGallery = project.galleryCollection && project.galleryCollection.items.length > 0;


    return (
        <div className='flex flex-col gap-8 py-16'>
            <BackButton/>
            <Card className="relative overflow-hidden bg-card/80 min-h-[320px] flex flex-col justify-end">
                {project.image && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={project.image.url}
                            alt={project.image.alt || project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"/>
                    </div>
                )}
                <CardHeader className="relative">
                    <h1 className="text-3xl md:text-6xl font-medium md:font-thin">{project.title}</h1>
                    <h2 className="text-base mt-1 md:mt-3">{project.subtitle}</h2>
                    <p className="text-sm md:text-base text-neutral-300">{project.brief}</p>
                </CardHeader>
            </Card>
            <div className='grid md:grid-cols-12 gap-4 items-start'>
                <div className="grid col-span-7 md:col-span-8">
                    <Card className="w-full bg-card/80 gap-2">
                        {documentToReactComponents(project.description.json, options)}
                        <span className="h-5"/>
                        {documentToReactComponents(project.keyFeatures.json, keyFeatureOptions)}
                    </Card>
                </div>
                <div className="grid col-span-5 md:col-span-4">
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader className="py-0 my-0 mb-0">
                            <CardTitle className="py-0 my-0 mb-0">Project Details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-neutral-400">Client</p>
                                <p className="text-base">{project.client}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-400">Timeline</p>
                                <p className="text-base">{formattedStartDate} - {formattedEndDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-400">Role</p>
                                <p className="text-base">{project.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <span className="h-5"/>
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader>
                            <CardTitle>Technologies & Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {project.tools.map((tool, index) =>
                                    <li key={index}
                                        className="flex flex-row text-base items-center after:content-[','] last:after:hidden">
                                        {tool}
                                    </li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                    <span className="h-5"/>
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader>
                            <CardTitle>Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {project.linksCollection.items.map((link, index) =>
                                    <Button key={index} variant="outline" size="sm" asChild>
                                        <Link href={link.link} target="_blank" rel="noopener noreferrer">
                                            <ProjectLinkIcon link={link}/> {link.type}
                                        </Link>
                                    </Button>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                {hasGallery && (
                    <div className="grid md:col-span-full">
                        <Card className="w-full bg-card/80 gap-4">
                            <CardHeader>
                                <CardTitle>Project Gallery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.galleryCollection!.items.map((item: AssetT, index: number) => (
                                        <li key={index}
                                            className="relative w-full aspect-video overflow-hidden rounded-lg">
                                            <Image
                                                src={item.url}
                                                alt={item.alt || project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
