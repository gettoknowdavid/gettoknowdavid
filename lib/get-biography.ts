import { gql } from "@apollo/client";

import { getClient } from "@/lib/apollo-client";
import { BiographyT } from "@/types";

const getBiography: () => Promise<BiographyT> = async () => {
  const { data } = await getClient().query<{ biography: BiographyT }>({
    query: gql`
      query BiographyQuery {
        biography(id: "1rVhxonDRkA3NVNlTmYOYH") {
          title
          content {
            json
          }
        }
      }
    `,
  });

  return data.biography;
};

export default getBiography;
