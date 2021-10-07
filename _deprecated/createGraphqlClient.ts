import { ApolloClient, InMemoryCache } from "@apollo/client";

export const CreateGraphqlClient = () => {

    const client = new ApolloClient({
      uri: process.env.REACT_APP_GRAPHQL_URI || "/api/graphql",
      cache: new InMemoryCache(),
    });


    return client;
}

