import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();


function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:3000/api/graphql",
      headers: {
        "X-hasura-admin-secret": "<YOUR_HASURA_KEY>", // or any other values for the http request
        lang: "en",
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
