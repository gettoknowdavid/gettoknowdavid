// noinspection JSUnusedGlobalSymbols

"use client";

import React, {useEffect, useState, useTransition} from "react";
import {useSuspenseQuery} from "@apollo/client/react";
import {GET_SHOTS} from "@/app/_graphql/get-shots";
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
import {ShotT} from "@/type";
import Image from "next/image";

export const ShotsList = () => {
    const limit = 50; // Increase for better masonry effect

    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    const {data, fetchMore} = useSuspenseQuery(GET_SHOTS, {variables: {limit, skip: 0}});

    const shots = data.shotsCollection.shots;
    const hasNoMore = shots.length === data.shotsCollection.total;

    const [carouselOpen, setCarouselOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;
        api.scrollTo(selectedIndex);
    }, [api, selectedIndex, open]);

    const handleImageClick = (index: number) => {
        setSelectedIndex(index);
        setCarouselOpen(true);
    };

    function getMore() {
        startTransition(() => {
            fetchMore({
                variables: {limit, skip: page * limit},
                updateQuery: (previousQueryResult, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return previousQueryResult;

                    return {
                        shotsCollection: {
                            ...fetchMoreResult.shotsCollection,
                            shots: [
                                ...previousQueryResult.shotsCollection.shots,
                                ...fetchMoreResult.shotsCollection.shots,
                            ],
                        },
                    };
                },
            });

            setPage((prevPage) => prevPage + 1);
        });
    }

    return (
        <>
            <ul className="columns-2 md:columns-3 m-0 p-0 gap-0 space-0">
                {shots.map((shot, index) => {
                    return (
                        <li key={shot.id} onClick={() => handleImageClick(index)}>
                            <ShotItem shot={shot}/>
                        </li>
                    );
                })}
            </ul>

            <Dialog open={carouselOpen} onOpenChange={setCarouselOpen} modal>
                <DialogContent className="max-w-[90vw] w-full bg-transparent border-none shadow-none">
                    <DialogHeader>
                        <DialogTitle/>
                    </DialogHeader>
                    <div className="relative w-full">
                        <Carousel opts={{align: "center"}} setApi={setApi} className="w-full">
                            <CarouselContent>
                                {shots.map((item: ShotT, index: number) => (
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

            <div className="flex justify-center mt-8">
                <Button
                    variant="link"
                    size="sm"
                    className="uppercase rounded-none"
                    onClick={getMore}
                    disabled={hasNoMore || isPending}
                >
                    {isPending ? "Loading..." : hasNoMore ? "No More" : "Load More"}
                </Button>
            </div>
        </>
    );
};