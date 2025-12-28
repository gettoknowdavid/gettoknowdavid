import {ApolloClient, InMemoryCache, SSRMultipartLink} from "@apollo/client-integration-nextjs";
import {ApolloLink, HttpLink} from "@apollo/client";
import {Defer20220824Handler} from "@apollo/client/incremental";

const GITHUB_API_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

function makeClient() {
    const githubLink = new HttpLink({
        uri: "https://api.github.com/graphql",
        headers: {Authorization: `Bearer ${GITHUB_API_TOKEN}`}
    });

    // Define the Default Link (The 'else' condition target)
    // Assuming this is your secondary/default API (e.g., the railway app)
    const defaultLink = new HttpLink({
        uri: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
        fetchOptions: {cache: "force-cache"},
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
        },
    });

    // 3. Use splitLink to route traffic:
    // IF the query context has { useGithub: true }, use githubLink.
    // ELSE, use the defaultLink.
    const splitLink = ApolloLink.split(
        (operation) => operation.getContext().useGithub,
        githubLink,
        defaultLink,
    );

    const ssrMultipartLink = new SSRMultipartLink({stripDefer: false, cutoffDelay: 100});

    const link = typeof window === "undefined"
        ? ApolloLink.from([ssrMultipartLink, splitLink])
        : ApolloLink.from([splitLink]);

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
        incrementalHandler: new Defer20220824Handler(),
    });
}

export default makeClient;