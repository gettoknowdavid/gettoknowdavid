import {Hero} from "@/type";
import fetchContentful from "@/lib/contentful";

const GET_HERO_QUERY = `
  query GetHero($name: String!) {
    heroCollection(where: { internalName: $name }, limit: 1) {
      items {
        sys {
          id
        }
        heading {
          json
        }
        enablePersonas
        personasCollection {
          items {
            sys {
              id
            }
            isDefault
            buttonLabel
            body {
              json
            }
          }
        }
      }
    }
  }
`;

interface HeroResponse {
    heroCollection: {
        items: Hero[];
    }
}

export const getHero = async (): Promise<Hero> => {
    const variables = {name: 'Intro'};
    const options = {revalidate: 3600, tags: ['hero', 'intro']};
    const data = await fetchContentful<HeroResponse>(GET_HERO_QUERY, variables, options);
    return data.heroCollection.items[0];
}