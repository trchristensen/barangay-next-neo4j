import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import getConfig from "next/config";
import { setContext } from "@apollo/client/link/context";

const { publicRuntimeConfig } = getConfig();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:3000/api/graphql",
});

// const setAuthorizationLink = setContext((request, previousContext) => {
//   return {
//     headers: { authorization: "1234" },
//   };
// });

const asyncAuthLink = setContext(
  (request) =>
    new Promise((success, fail) => {
      // do some async lookup here
      // get access token?
      // const { user } = supabase.auth.api.getUserByCookie(req);
      const user = 'todd'

      console.log("user request", user);

      success({ token: "async found token" });
      fail(console.log("failed!!"));
    })
);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: asyncAuthLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
