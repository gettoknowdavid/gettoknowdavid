import {Aperture, Briefcase, UserRound} from "lucide-react";
import Link from "next/link";
import {Container} from "@/components/ui/container";

const quickLinks = [
    {
        name: "Fun facts about me",
        href: "/about",
        icon: <UserRound className='w-3.5 h-3.5'/>,
    },
    {
        name: "See my works",
        href: "/works",
        icon: <Briefcase className='w-3.5 h-3.5'/>,
    },
    {
        name: "View my shots",
        href: "/shots",
        icon: <Aperture className='w-3.5 h-3.5'/>,
    },
];

export default function Home() {
    return (
        <Container variant='narrowConstrainedPadded'>
            <section className='h-screen w-full flex flex-col justify-center gap-8'>
                <h1 className='text-3xl tracking-tight'>
                    Hi, I'm David.
                    <br/>A <span className='text-accent'>frontend engineer</span>.
                </h1>

                <h2 className='leading-relaxed'>
                    Passionate about building functional websites and mobile applications
                    that help people. Beyond coding, I enjoy photography and music.
                </h2>

                <div className='flex flex-col justify-start mt-8'>
                    <h3 className='uppercase text-sm mb-3'>Where you can start</h3>
                    <ul className='flex flex-col gap-3 text-sm'>
                        {quickLinks.map((quickLink) => {
                            return (
                                <li key={quickLink.name}>
                                    <Link
                                        href={quickLink.href}
                                        className='text-foreground/90 hover:text-accent transition-colors duration-300 flex gap-2 items-center'
                                    >
                                        <span>{quickLink.icon}</span>
                                        {quickLink.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </Container>
    );
}
