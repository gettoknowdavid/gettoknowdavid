// noinspection JSUnusedGlobalSymbols
"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ShotItem} from "@/app/shots/_components/shot-item";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Shot} from "@/type";
import Image from "next/image";

interface ShotsClientProps {
    initialShots: {
        total: number;
        items: Shot[];
    };
}


export const ShotsList = ({initialShots}: ShotsClientProps) => {
    const [shots, setShots] = useState(initialShots.items);
    const [total] = useState(initialShots.total);
    const [isLoading, setIsLoading] = useState(false);

    const hasMore = shots.length < total;

    async function loadMore() {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/shots?skip=${shots.length}&limit=50`);
            const data = await response.json();

            setShots(prev => [...prev, ...data.items]);
        } catch (error) {
            console.error('Failed to load more shots:', error);
        } finally {
            setIsLoading(false);
        }
    }


    const [carouselOpen, setCarouselOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;
        api.scrollTo(selectedIndex);
    }, [api, selectedIndex, carouselOpen]);

    const handleImageClick = (index: number) => {
        setSelectedIndex(index);
        setCarouselOpen(true);
    };

    return (
        <>
            <ul className="columns-2 md:columns-3 gap-1 space-1">
                {shots.map((shot, index) => (
                    <li key={shot.sys.id} onClick={() => handleImageClick(index)}>
                        <ShotItem shot={shot}/>
                    </li>
                ))}
            </ul>

            <Dialog open={carouselOpen} onOpenChange={setCarouselOpen} modal>
                <DialogContent className="max-w-[90vw] w-full bg-transparent border-none shadow-none">
                    <DialogHeader>
                        <DialogTitle/>
                    </DialogHeader>
                    <div className="relative w-full">
                        <Carousel opts={{align: "center"}} setApi={setApi} className="w-full">
                            <CarouselContent>
                                {shots.map((item: Shot, index: number) => (
                                    <CarouselItem key={index} className="h-[80vh] md:h-[85vh] md:basis-1/2">
                                        <div className="relative w-full h-full">
                                            <Image
                                                alt={`Full view ${index + 1}`}
                                                className="object-contain"
                                                fill
                                                priority={index === selectedIndex}
                                                sizes="90vw"
                                                src={item.image.url}
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

            {hasMore && (
                <div className="flex justify-center mt-8">
                    <Button
                        variant="link"
                        size="sm"
                        className="uppercase rounded-none"
                        onClick={loadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </>
    );
};