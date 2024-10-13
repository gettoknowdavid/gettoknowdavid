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
    <div className="text-base md:text-lg text-right leading-relaxed lg:leading-loose text-foreground">
      {documentToReactComponents(bio, { preserveWhitespace: true })}
    </div>
  );
};
