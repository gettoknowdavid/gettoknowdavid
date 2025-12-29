'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";
import {ChevronLeft} from "lucide-react";

export const BackButton = () => {
    const router = useRouter();
    return (
        <Button className="rounded-none" variant="outline" size="icon" onClick={router.back}>
            <ChevronLeft/>
        </Button>
    );
}