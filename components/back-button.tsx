'use client';

import {ArrowLeftIcon} from "@phosphor-icons/react/ssr";
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";

export const BackButton = () => {
    const router = useRouter();
    return (
        <Button className="rounded-none" variant="outline" size="icon" onClick={router.back}>
            <ArrowLeftIcon/>
        </Button>
    );
}