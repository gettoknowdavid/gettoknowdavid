import {ContentfulResponse, FetchOptions} from "@/type";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

/**
 * Fetch data from Contentful GraphQL API
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param options - Next.js caching options
 */
export default async function fetchContentful<T>(
    query: string,
    variables: Record<string, any> = {},
    options: FetchOptions = {}
): Promise<T> {
    const {revalidate = 3600, tags = []} = options;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    };

    const response = await fetch(CONTENTFUL_GRAPHQL_URL, {
        method: 'POST',
        body: JSON.stringify({query, variables}),
        headers,
        next: {revalidate, tags},
    });

    if (!response.ok) {
        throw new Error(`Contentful API error: ${response.status} ${response.statusText}`);
    }

    const json: ContentfulResponse<T> = await response.json();

    if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data;
}