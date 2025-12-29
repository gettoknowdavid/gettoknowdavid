'use client';

import React from "react";
import {WorkLinkT} from "@/type";
import {GitBranch, Package, Rss} from "lucide-react";


export const WorkLinkIcon = ({link, size = 14}: { link: WorkLinkT; size?: number }) => {
    switch (link.type) {
        case "Live":
            return <Rss size={size}/>;
        case "Package":
            return <Package size={size}/>;
        case "Code":
            return <GitBranch size={size}/>;
        default:
            return <div>Nothing</div>;
    }
};