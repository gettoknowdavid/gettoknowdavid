"use client";

import React from "react";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const getBiography: TypedDocumentNode<any> = gql`
  query BiographyQuery {
    biography(id: "1rVhxonDRkA3NVNlTmYOYH") {
      title
      content {
        json
      }
    }
  }
`;

export const Biography: React.FC = () => {
  const { data } = useSuspenseQuery(getBiography);

  const title = data.biography.title;
  const bio = data.biography.content.json;

  return (
    <div className="flex flex-col gap-6 max-w-xs md:max-w-md lg:max-w-max py-pad-2x">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-foreground ml-[-1px] lg:ml-[-3px] font-extralight">
          David Michael II
        </h1>
        <p className="text-xs lg:text-sm tracking-wide text-primary-500">
          {title}
        </p>
      </div>
      <div>
        <span className="text-sm md:text-lg lg:text-lg leading-relaxed lg:leading-loose font-regular text-primary-600">
          {documentToReactComponents(bio, { preserveWhitespace: true })}
        </span>
      </div>
    </div>
  );
};
