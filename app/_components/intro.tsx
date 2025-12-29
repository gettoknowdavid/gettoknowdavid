"use client";
import React, {ReactNode, use} from 'react'
import {BLOCKS, MARKS} from "@contentful/rich-text-types";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Hero, Persona} from "@/type";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";


export const Intro = ({data}: { data: Promise<Hero> }) => {
    const hero = use(data);
    const personas = hero.personasCollection.items;

    const [selectedPersonaIndex, setSelectedPersonaIndex] = React.useState<number>(0);
    const currentPersona: Persona = personas[selectedPersonaIndex];
    const isEngineerPersona = currentPersona.buttonLabel.toLowerCase().includes('engineer');

    // Scroll fade state
    const scrollContainerRef = React.useRef<HTMLUListElement>(null);
    const [showLeftFade, setShowLeftFade] = React.useState(false);
    const [showRightFade, setShowRightFade] = React.useState(false);

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const {scrollLeft, scrollWidth, clientWidth} = container;

        // Show left fade if scrolled from the start
        setShowLeftFade(scrollLeft > 10);

        // Show right fade if not at the end
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
    };

    React.useEffect(() => {
        checkScroll(); // Check on mount
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            // Also check on resize
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const normalOptions = {
        renderText: _renderText,
        preserveWhitespace: true,
        renderNode: {
            [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
                <p className="m-0 md:leading-snug lg:leading-18 text-3xl md:text-4xl lg:text-6xl font-medium">
                    {children}
                </p>
            ),
        },
        renderMark: {[MARKS.UNDERLINE]: (text: any) => <span className="underline decoration-accent">{text}</span>},
    };

    const codeOptions = {
        renderText: _renderText,
        preserveWhitespace: true,
        renderNode: {
            [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
                <p className="m-0 leading-[1.5] font-mono text-[13px] md:text-sm whitespace-pre-wrap">{children}</p>
            )
        },
        renderMark: {
            [MARKS.UNDERLINE]: (text: any) => <span className="text-purple-400">{text}</span>,
            [MARKS.BOLD]: (text: any) => <span className="text-amber-300 font-semibold">{text}</span>,
            [MARKS.ITALIC]: (text: any) => <span className="text-gray-400 italic">{text}</span>,
        },
    };
    const bodyOptions = isEngineerPersona ? codeOptions : normalOptions;
    const body = documentToReactComponents(currentPersona.body.json, bodyOptions);

    return (
        <div className="flex flex-col h-screen justify-center">
            <div className="flex-shrink-0 relative">
                {/* Left fade gradient */}
                <div
                    className={cn(
                        "absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10 transition-opacity duration-300",
                        "bg-gradient-to-r from-black to-transparent",
                        showLeftFade ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* Scrollable container */}
                <ul
                    ref={scrollContainerRef}
                    className="flex flex-row flex-nowrap overflow-x-scroll mb-8 p-0 gap-5"
                    style={{scrollbarWidth: "none", userSelect: "none"}}
                >
                    {personas.map((persona: Persona, index) => {
                        const isSelected = selectedPersonaIndex === index;
                        return (
                            <li key={persona.sys.id} className="font-medium tracking-wide flex text-nowrap">
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedPersonaIndex(index);
                                    }}
                                    className={cn(
                                        isSelected ? "text-accent" : "text-neutral-400 hover:opacity-30",
                                        "transition-all duration-500",
                                    )}
                                >
                                    {persona.buttonLabel}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right fade gradient */}
                <div
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10 transition-opacity duration-300",
                        "bg-gradient-to-l from-black to-transparent",
                        showRightFade ? "opacity-100" : "opacity-0"
                    )}
                />
            </div>
            {isEngineerPersona ? (
                <Card className="max-h-[70vh] md:max-h-[60vh] h-full bg-neutral-900 pl-4 md:px-6">{body}</Card>
            ) : (
                <div className="flex-shrink-1 max-h-[70vh] md:max-h-[60vh] h-full">{body}</div>
            )}
        </div>
    );
};

export const IntroSkeleton = () => {
    return (
        <div className="flex flex-col h-screen justify-center">
            {/* Navigation/Persona buttons skeleton */}
            <div className="flex-shrink-0 relative">
                <ul className="flex flex-row flex-nowrap overflow-x-scroll mb-8 p-0 gap-5"
                    style={{scrollbarWidth: "none"}}>
                    {Array.from({length: 5}).map((_, index) => (
                        <li key={index} className="font-medium tracking-wide flex text-nowrap">
                            <Skeleton className="h-6 w-32"/>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content skeleton */}
            <div className="flex-shrink-1 max-h-[70vh] md:max-h-[60vh] h-full space-y-6">
                {/* Large text blocks mimicking the intro text */}
                <Skeleton className="h-10 md:h-14 lg:h-16 w-full"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-full"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-5/6"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-full"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-4/5"/>
            </div>
        </div>
    );
};


function _renderText(text: String): ReactNode {
    return text.split("\n").flatMap((textSegment, index) => {
        return index === 0 ? [textSegment] : [<br key={`br-${index}`}/>, textSegment];
    });
}
