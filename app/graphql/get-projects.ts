import {gql, TypedDocumentNode} from "@apollo/client";
import {ProjectItemT} from "@/type";

export const GET_PROJECTS: TypedDocumentNode<{ workCollection: { projects: ProjectItemT[] } }> = gql`
  query ProjectsQuery {
    workCollection(order: endDate_DESC) {
      projects: items {
        sys {
          id
        }
        title
        slug
        brief
        tools
      }
    }
  }
`;