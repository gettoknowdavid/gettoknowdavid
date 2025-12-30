'use client';

import React, {use} from "react";
import {Contact} from "@/type";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export const Contacts = ({data}: { data: Promise<Contact[]> }) => {
    const contacts = use(data);
    return (
        <div className='flex lg:hidden flex-col gap-8 lg:h-screen justify-center pb-24'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className="text-nowrap uppercase tracking-widest text-base">Contacts</h1>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
                {contacts.map((contact: Contact) => (
                    <ContactItem key={contact.sys.id} contact={contact}/>
                ))}
            </ul>
        </div>
    );
}

const ContactItem = ({contact}: { contact: Contact }) => {
    return (
        <li>
            <Link href={contact.link} target='_blank' rel='noopener noreferrer' className="flex items-baseline gap-2">
                <div className="relative h-6 w-6">
                    <Image
                        src={contact.icon.url}
                        alt={contact.icon.title}
                        fill
                        className="object-fill invert hover:scale-150 transition-all duration-300"
                    />
                </div>
                <small className="font-normal text-sm text-neutral-400">{contact.label}</small>
            </Link>
        </li>
    );
}

export const ContactsSkeleton = () => {
    return (
        <div className='flex flex-col gap-8 lg:h-screen justify-center pb-24'>
            <Skeleton className="h-5 w-24"/>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
                {Array.from({length: 6}).map((_, index) => (
                    <li key={index} className="flex items-baseline gap-2">
                        <Skeleton className="h-6 w-6"/>
                        <Skeleton className="h-4 w-16"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}