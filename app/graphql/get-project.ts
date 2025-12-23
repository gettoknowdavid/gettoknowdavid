import {gql, TypedDocumentNode} from "@apollo/client";
import {Project} from "@/type";

export const GET_PROJECT: TypedDocumentNode<{ workCollection: { items: Project[] } }> = gql`
  query GetProject($slug: String!) {
    workCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        featured
        title
        subtitle
        slug
        brief
        description {
          json
        }
        keyFeatures {
          json
        }
        tools
        startDate
        endDate
        image {
          url
          alt: title
        }
        linksCollection {
          items {
            title
            type
            link
          }
        }
        liveUrl
        gitHubUrl
        tags
        client
        role
        galleryCollection {
          items {
            url
            title
          }
        }
      }
    }
  }
`;