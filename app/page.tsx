import { IntroSection } from "@/app/components/intro/intro-section";
import { ProjectsSection } from "@/app/components/work/projectsSection";
import { ShotsSection } from "@/app/components/shots/shots-section";
import { BlogSection } from "@/app/components/blog/blog-section";
import { ContactSection } from "@/app/components/contact/contact-section";

export default function Home() {
  return (
    <div>
      <IntroSection />
      <ProjectsSection />
      <ShotsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
