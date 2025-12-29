import {Reference} from "@/type";
import fetchContentful from "@/lib/contentful";

const GET_REFERENCES_QUERY = `
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

interface ReferencesResponse {
    referenceCollection: {
        items: Reference[]
    }
}

export const getReferences = async (limit = 5): Promise<Reference[]> => {
    const variables = {limit: limit};
    const options = {revalidate: 3600, tags: ['references']};
    const data = await fetchContentful<ReferencesResponse>(GET_REFERENCES_QUERY, variables, options);
    return data.referenceCollection.items;
}