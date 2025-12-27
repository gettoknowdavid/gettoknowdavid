import {gql, TypedDocumentNode} from "@apollo/client";
import {WorkItemT} from "@/type";

export const GET_WORKS: TypedDocumentNode<{ workCollection: { works: WorkItemT[] } }> = gql`
  query WorksQuery($limit: Int) {
    workCollection(order: endDate_DESC, limit: $limit) {
      works: items {
        sys {
          id
        }
        title
        slug
        brief
        toolsShort
        role
        startDate
        endDate
        client
      }
    }
  }
`;