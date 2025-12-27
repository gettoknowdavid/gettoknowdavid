'use client';

import {IconWeight} from "@phosphor-icons/react";
import {GitBranchIcon, PackageIcon, RssSimpleIcon} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import {WorkLinkT} from "@/type";


export const WorkLinkIcon = ({link, size = 14, weight = "regular"}: {
    link: WorkLinkT;
    size?: number;
    weight?: IconWeight | undefined;
}) => {
    switch (link.type) {
        case "Live":
            return <RssSimpleIcon size={size} weight={weight}/>;
        case "Package":
            return <PackageIcon size={size} weight={weight}/>;
        case "Code":
            return <GitBranchIcon size={size} weight={weight}/>;
        default:
            return <div>Nothing</div>;
    }
};