import {Intro} from "@/app/_components/intro";

export default function HomePage() {
    return (
        <section className='h-screen grid app-margin w-full gap-4 items-center grid--app-columns'>
            <div className='content'>
                <Intro/>
            </div>
        </section>
    );
}
