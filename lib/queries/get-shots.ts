import {Shot} from "@/type";
import fetchContentful from "@/lib/contentful";

const GET_SHOTS_QUERY = `
  query ShotsQuery($limit: Int!, $skip: Int!) {
    shotsCollection(limit: $limit, skip: $skip) {
      limit
      skip
      total
      items {
        sys {
          id
        }
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

interface ShotsResponse {
    shotsCollection: {
        total: number;
        skip: number;
        limit: number;
        items: Shot[],
    }
}

export const getShots = async (limit: number = 50, skip: number = 0): Promise<ShotsResponse['shotsCollection']> => {
    const variables = {limit, skip};
    const options = {revalidate: 3600, tags: ['shots']};
    const data = await fetchContentful<ShotsResponse>(GET_SHOTS_QUERY, variables, options);
    return data.shotsCollection;
}