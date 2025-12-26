import {gql, TypedDocumentNode} from "@apollo/client";
import {HeroCollection} from "@/type";

export const GET_HERO: TypedDocumentNode<{ heroCollection: HeroCollection }> = gql`
  query GetHero($name: String!) {
    heroCollection(where :{ internalName: $name }, limit: 1) {
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