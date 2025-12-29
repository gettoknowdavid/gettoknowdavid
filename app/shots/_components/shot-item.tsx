"use client";

import React from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Shot} from "@/type";
import Image from "next/image";

export const ShotItem = ({shot}: { shot: Shot }) => {
    return (
        <Card className="rounded-none bg-transparent shadow-none border-0 p-0 m-0 relative group overflow-hidden">
            <CardContent className="p-0 m-0 relative">
                <Image
                    src={shot.image.url}
                    alt={shot.title}
                    width={shot.image.width}
                    height={shot.image.height}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 z-10 flex items-end">
                    <div className="bg-black/70 py-3 px-5 w-full">
                        <p className="text-white text-sm">{shot.title}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};