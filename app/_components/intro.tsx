"use client";

import React, {ReactNode} from "react";
import {useSuspenseQuery} from "@apollo/client/react";
import {GET_HERO} from "@/app/graphql/get-hero";
import {BLOCKS, MARKS} from "@contentful/rich-text-types";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Persona} from "@/type";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Card} from "@/components/ui/card";


export const Intro = () => {
    const {data} = useSuspenseQuery(GET_HERO, {variables: {name: 'Intro'}});

    const hero = data.heroCollection.items[0];
    const personas = hero.personasCollection.items;

    const [selectedPersonaIndex, setSelectedPersonaIndex] = React.useState<number>(0);
    const currentPersona: Persona = personas[selectedPersonaIndex];
    const isEngineerPersona = currentPersona.buttonLabel.toLowerCase().includes('engineer');

    const normalOptions = {
        renderText: _renderText,
        preserveWhitespace: true,
        renderNode: {
            [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
                <p className="m-0 leading-18 text-xl lg:text-6xl font-medium">
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
                <p className="m-0 font-mono text-sm whitespace-pre-wrap">{children}</p>
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
            <div className="flex-shrink-0">
                <ul className="flex flex-row mb-8 p-0 gap-5">
                    {personas.map((persona: Persona, index) => {
                        const isSelected = selectedPersonaIndex === index;
                        return (
                            <li key={persona.sys.id} className="font-medium tracking-wide">
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedPersonaIndex(index);
                                    }}
                                    className={cn(
                                        isSelected ? "text-accent" : "text-foreground hover:opacity-30",
                                        "transition-all duration-500",
                                    )}
                                >
                                    {persona.buttonLabel}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {isEngineerPersona ? (
                <Card className="max-h-[60vh] h-full ringed-card bg-neutral-900 px-6">{body}</Card>
            ) : (
                <div className="flex-shrink-1 max-h-[60vh] h-full">{body}</div>
            )}
        </div>
    );
};

function _renderText(text: String): ReactNode {
    return text.split("\n").flatMap((textSegment, index) => {
        return index === 0 ? [textSegment] : [<br key={`br-${index}`}/>, textSegment];
    });
}
