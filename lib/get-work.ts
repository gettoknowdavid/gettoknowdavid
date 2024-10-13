import { gql } from "@apollo/client";

import { getClient } from "@/lib/apollo-client";
import { WorksCollection, WorkT } from "@/types";

type GetWorkQueryType = { workCollection: WorksCollection };

const getWork: ({ slug }: { slug: string }) => Promise<WorkT> = async ({
  slug,
}: {
  slug: string;
}) => {
  const { data } = await getClient().query<GetWorkQueryType>({
    query: gql`
        query WorkQuery {
            workCollection(where: { slug: "${slug}" }){
                works: items {
                    title
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

  return data.workCollection.works[0];
};

export default getWork;
