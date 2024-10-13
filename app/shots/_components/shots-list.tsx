"use client";

import React, { useState, useTransition } from "react";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { Button } from "@nextui-org/button";

import { ShotCard } from "@/app/shots/_components/shot-card";
import { ShotsCollection } from "@/types";

export const getShotsQ: TypedDocumentNode<{
  shotsCollection: ShotsCollection;
}> = gql`
  query ShotsQuery($limit: Int!, $skip: Int!) {
    shotsCollection(limit: $limit, skip: $skip) {
      limit
      skip
      total
      shots: items {
        id: _id
        title
        description {
          json
        }
        image {
          url
          title
        }
      }
    }
  }
`;

export const ShotsList = () => {
  const limit = 6;

  const [page, setPage] = useState(1);

  const [isPending, startTransition] = useTransition();

  const { data, fetchMore } = useSuspenseQuery(getShotsQ, {
    variables: { limit, skip: 0 },
  });

  const shots = data.shotsCollection.shots;

  const hasNoMore = shots.length === data.shotsCollection.total;

  function getMore() {
    startTransition(() => {
      fetchMore({
        variables: { limit, skip: page * limit },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousQueryResult;

          return {
            shotsCollection: {
              ...fetchMoreResult.shotsCollection,
              shots: [
                ...previousQueryResult.shotsCollection.shots,
                ...fetchMoreResult.shotsCollection.shots,
              ],
            },
          };
        },
      });

      setPage((prevPage) => prevPage + 1);
    });
  }

  return (
    <>
      <ul className="column-1 md:columns-2 lg:columns-3 space-y-4 gap-4">
        {data.shotsCollection.shots.map((shot, index) => (
          <ShotCard key={index} shot={shot} />
        ))}
      </ul>

      <div className="flex justify-center mt-pad-2x mb-pad-x">
        <Button
          className="bg-primary-100 uppercase rounded-none"
          isDisabled={hasNoMore}
          isLoading={isPending}
          onPress={getMore}
        >
          {hasNoMore ? "No More" : "Load More"}
        </Button>
      </div>
    </>
  );
};
