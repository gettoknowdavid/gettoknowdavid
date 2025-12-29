import {Work} from "@/type";
import fetchContentful from "@/lib/contentful";

const GET_WORKS_QUERY = `
  query WorksQuery($limit: Int) {
    workCollection(order: endDate_DESC, limit: $limit) {
      items {
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

interface WorksResponse {
    workCollection: {
        total: number;
        skip: number;
        limit: number;
        items: Work[],
    }
}

export const getWorks = async (limit = 50): Promise<Work[]> => {
    const options = {revalidate: 3600, tags: ['works']};
    const data = await fetchContentful<WorksResponse>(GET_WORKS_QUERY, {limit: limit}, options);
    return data.workCollection.items;
}