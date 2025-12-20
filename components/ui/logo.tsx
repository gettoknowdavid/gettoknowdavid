'use client';

import React from "react";
import Link from "next/link";
import {useLayoutProvider} from "@/components/layout-context";

export const Logo: React.FC = () => {
    const {closeMenu} = useLayoutProvider();

    return (
        <Link
            href={"/"}
            className='text-xl font-medium tracking-widest z-50'
            onClick={closeMenu}
        >
            David Michael II
        </Link>
    );
}