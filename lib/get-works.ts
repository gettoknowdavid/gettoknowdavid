import { gql } from "@apollo/client";

import { getClient } from "@/lib/apollo-client";
import { WorksCollection, WorkT } from "@/types";

type GetWorksQueryType = { workCollection: WorksCollection };
const getWorks: () => Promise<WorkT[]> = async () => {
  const { data } = await getClient().query<GetWorksQueryType>({
    query: gql`
      query WorksQuery {
        workCollection(order: endDate_DESC) {
          works: items {
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
    `,
  });

  return data.workCollection.works;
};

export default getWorks;
