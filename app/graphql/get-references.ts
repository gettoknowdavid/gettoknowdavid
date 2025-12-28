import {gql, TypedDocumentNode} from "@apollo/client";
import {ReferenceCollection} from "@/type";

export const GET_REFERENCES: TypedDocumentNode<{ referenceCollection: ReferenceCollection }> = gql`
  query GetReferences($limit: Int) {
    referenceCollection(limit: $limit, order: sys_firstPublishedAt_ASC) {
      items {
        sys {
          id
        }
        refereeName
        refereeRole
        refereeLink
        content
      }
    }
  }
`;