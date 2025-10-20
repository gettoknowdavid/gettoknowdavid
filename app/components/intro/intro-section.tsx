"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { siteConfig } from "@/config/site";

export const IntroSection = () => {
  return (
    <section className='h-screen w-full flex flex-col justify-center gap-8 px-4 md:px-12 py-14'>
      <div className='w-fit flex items-center rounded-full gap-3 py-1.5 pl-3 pr-4 border border-zinc-600/75 bg-slate-950/25'>
        <div className='relative size-3'>
          <div className='absolute size-full rounded-full bg-green-300 animate-ping'></div>
          <div className='drop-shadow-green-400 rounded-full size-full bg-green-400'></div>
        </div>
        <h3 className='max-sm:text-xs text-sm text-slate-200'>Open to Work</h3>
      </div>

      <h1 className='text-4xl md:text-7xl lg:text-8xl tracking-tight'>
        Hi, I'm David.
        <br />A <span className='text-accent'>frontend engineer</span>.
      </h1>

      <h2 className='text-2xl md:text-2xl lg:text-2xl max-w-2xl font-light leading-relaxed'>
        Passionate about building functional websites and mobile applications
        that help people. Beyond coding, I enjoy photography and music.
      </h2>

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
    </section>
  );
};
