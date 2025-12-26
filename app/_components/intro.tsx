"use client";

import React from "react";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";

export const Intro = () => {
    return (
        <div className="flex flex-col gap-8">
            <div
                className='w-fit flex items-center rounded-full gap-3 py-1.5 pl-3 pr-4 border border-zinc-600/75 bg-slate-950/25'>
                <div className='relative size-3'>
                    <div className='absolute size-full rounded-full bg-green-300 animate-ping'></div>
                    <div className='drop-shadow-green-400 rounded-full size-full bg-green-400'></div>
                </div>
                <h3 className='max-sm:text-xs text-sm text-slate-200'>Open to Work</h3>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-5xl xl:text-9xl font-sans font-light'>
                Hi, I'm David.
                <br/>A <span className='text-accent'>frontend engineer</span>.
            </h1>

            <p className='text-xl lg:text-xl max-w-2xl font-regular text-neutral-300 tracking-wide leading-relaxed font-sans'>
                Passionate about building functional and performant applications
                that help people solve problems. Specifically focusing on Flutter and
                KMP. Beyond coding, I enjoy photography and music.
            </p>

            <a href={siteConfig.contact} target='_blank' rel='noopener noreferrer'>
                <div
                    className={cn(
                        "w-fit max-w-sm rounded-lg p-[1.8px] animate-rotate-border",
                        "bg-conic/[from_var(--border-angle)] from-black via-accent to-black",
                        "from-80% via-90% to-100%",
                        "cursor-pointer hover:scale-[1.03] transition duration-300",
                    )}
                >
                    <div
                        className={cn(
                            "px-8 py-3.5",
                            "bg-neutral-900 border border-neutral-800 rounded-lg",
                            "font-medium text-foreground",
                        )}
                    >
                        Get in Touch
                    </div>
                </div>
            </a>
        </div>
    );
};
