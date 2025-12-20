import {gql} from "@apollo/client";

export const GET_PROJECTS = gql`
  query ProjectsQuery {
    workCollection(order: endDate_DESC) {
      projects: items {
        sys {
          id
        }
        title
        slug
        brief
        description
        tools
        tags
        image {
          url
          alt: description
        }
        images: imagesCollection {
          items {
            url
            alt: description
          }
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