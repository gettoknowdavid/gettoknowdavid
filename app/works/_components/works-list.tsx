"use client";

import React from "react";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";

import { WorksCollection } from "@/types";
import { WorkItem } from "@/app/works/_components/work-item";

export const getWorks: TypedDocumentNode<{ workCollection: WorksCollection }> =
  gql`
    query WorksQuery {
      workCollection(order: endDate_DESC) {
        works: items {
          id: _id
          title
          slug
          brief
          description
          tools
          image {
            url
            alt: description
          }
          links: linksCollection {
            items {
              _id
              type
              link
            }
          }
        }
      }
    }
  `;

export const WorksList: React.FC = () => {
  const { data } = useSuspenseQuery(getWorks);

  return (
    <ul className="flex flex-col items-start lg:items-end gap-5 md:gap-6 lg:gap-7 xl:gap-9">
      {data.workCollection.works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
      {data.workCollection.works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
      {data.workCollection.works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
      {data.workCollection.works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
      {data.workCollection.works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
    </ul>
  );
};
