'use client';

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {AssetT} from "@/type";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";


export const WorkGallery = ({items}: { items: AssetT[] }) => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;
        api.scrollTo(selectedIndex);
    }, [api, selectedIndex, open]);

    const handleImageClick = (index: number) => {
        setSelectedIndex(index);
        setOpen(true);
    };

    return (
        <Card className="w-full bg-background border-none gap-4">
            <CardHeader>
                <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
                <ul
                    className="grid grid-cols-1 md:grid-cols-2 gap-[1.5px]"
                    style={{background: 'var(--border)'}}
                >
                    {items.map((item: AssetT, index: number) => (
                        <li
                            key={index}
                            className="relative w-full aspect-video overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleImageClick(index)}
                        >
                            <Image
                                src={item.url}
                                alt={item.alt || index.toString()}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </li>
                    ))}
                </ul>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-[90vw] w-full bg-transparent border-none shadow-none">
                        <DialogHeader>
                            <DialogTitle/>
                        </DialogHeader>
                        <div className="relative w-full">
                            <Carousel setApi={setApi} className="w-full">
                                <CarouselContent>
                                    {items.map((item: AssetT, index: number) => (
                                        <CarouselItem key={index} className="h-[80vh] md:h-[85vh]">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    alt={`Full view ${index + 1}`}
                                                    className="object-contain"
                                                    fill
                                                    priority={index === selectedIndex}
                                                    sizes="90vw"
                                                    src={item.url}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
