import {gql, TypedDocumentNode} from "@apollo/client";
import {ShotsCollection} from "@/type";

export const GET_SHOTS: TypedDocumentNode<{ shotsCollection: ShotsCollection }> = gql`
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
          height
          width
        }
      }
    }
  }
`;
