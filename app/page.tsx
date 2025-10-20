import {IntroSection} from "@/app/components/intro/intro-section";
import {WorkSection} from "@/app/components/work/work-section";
import {ShotsSection} from "@/app/components/shots/shots-section";
import {BlogSection} from "@/app/components/blog/blog-section";
import {ContactSection} from "@/app/components/contact/contact-section";

export default function Home() {
    return (
        <>
            <IntroSection/>
            <WorkSection/>
            <ShotsSection/>
            <BlogSection/>
            <ContactSection/>
        </>
    );
}
