import {Work} from "@/type";
import {cache} from "react";
import fetchContentful from "@/lib/contentful";

const GET_WORK_QUERY = `
  query GetWork($slug: String!) {
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

interface WorkResponse {
    workCollection: {
        items: Work[];
    };
}

export const getWork = cache(async (slug: string): Promise<Work | null> => {
    const options = {revalidate: 3600, tags: ['works', `work-${slug}`]};
    const data = await fetchContentful<WorkResponse>(GET_WORK_QUERY, {slug}, options);
    return data.workCollection.items[0] || null;
});