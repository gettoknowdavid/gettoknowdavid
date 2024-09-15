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

  const bio = data.biography.content.json;

  return (
    <div>
      <span className="text-sm md:text-lg lg:text-lg leading-relaxed lg:leading-loose text-left lg:text-right font-regular text-primary-600">
        {documentToReactComponents(bio, { preserveWhitespace: true })}
      </span>
    </div>
  );
};
