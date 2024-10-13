import React from "react";
import { Metadata } from "next";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";

import getWorks from "@/lib/get-works";
import getWork from "@/lib/get-work";
import { siteConfig } from "@/config/site";
import { BackButton } from "@/components/back-button";
import { StringList } from "@/components/string-list";
import { WorkLinkIcon } from "@/app/works/_components/work-link-icon";
import { WorkImageCarousel } from "@/app/works/[slug]/_components/work-image-carousel";
import { Image } from "@/components/image";

export const metadata: Metadata = {
  title: {
    default: "Works",
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
};

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  const works = await getWorks();

  return works.map((work) => ({ slug: work.slug }));
}

const Label = ({ children }: { children: React.ReactNode }) => {
  return <small className="uppercase text-primary-500 mb-1">{children}</small>;
};

export default async function WorkDetailPage(props: PageProps) {
  const work = await getWork({ slug: props.params.slug });

  return (
    <section className="min-h-screen h-full w-full max-w-[1440px] lg:px-pad mx-auto mt-pad-3x">
      <div className="fixed left-pad z-50">
        <BackButton />
      </div>
      <div className="py-pad-2x lg:py-pad-x">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl md:text-3xl xl:text-4xl tracking-tighter">
            {work.title}
          </h1>
          <p className="text-xs text-primary-500">{2023}</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-pad pb-pad-x px-pad lg:px-0">
        {work.images.items.length > 0 ? (
          <WorkImageCarousel work={work} />
        ) : (
          <div className="grid aspect-square lg:aspect-video bg-foreground/[0.05]">
            <Image image={work.image} />
          </div>
        )}
        <div className="text-lg lg:text-xl flex flex-col gap-pad leading-relaxed tracking-tight">
          <div>
            <Label>Description</Label>
            <p>{work.brief}</p>
            <Spacer className="h-2" />
            <p>{work.description}</p>
          </div>
          <div className="max-w-md">
            <Label>Tools</Label>
            <StringList items={work.tools} />
          </div>
          <div className="max-w-md">
            <Label>Tags</Label>
            <StringList items={work.tags} />
          </div>
          <div>
            <Label>Links</Label>
            <ul className="flex gap-3 flex-wrap">
              {work.links.items.map((link) => (
                <Button
                  key={link._id}
                  className="border border-foreground rounded-none bg-background"
                  startContent={WorkLinkIcon({ link })}
                >
                  {link.type}
                </Button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
