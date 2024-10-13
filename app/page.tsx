import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import Link from "next/link";

import AnimatedText from "@/components/animated-text";
import getBiography from "@/lib/get-biography";

export default async function HomePage() {
  const biography = await getBiography();
  const bio = biography.content.json;

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: ({ data }: { data: any }, children: any) => (
        <Link href={data.uri}>{children}</Link>
      ),
    },
  };

  return (
    <section className="px-pad py-pad-2x h-screen w-screen">
      <div className="h-full w-full flex items-end md:items-center justify-center">
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="text-3xxl md:text-5xl uppercase tracking-tighter text-left h-9 md:h-12">
            <AnimatedText text="Hello," />
          </div>
          <div className="text-xl leading-relaxed uppercase pl-1">
            {documentToReactComponents(bio, options)}
          </div>
        </div>
      </div>
    </section>
  );
}
