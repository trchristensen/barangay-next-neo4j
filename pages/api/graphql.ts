import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
// import "ts-tiny-invariant"
import { typeDefs } from "../../graphql/typeDefs";
import { NextApiResponse, NextApiRequest } from "next";
import useSWR from "swr";
import { resolvers } from "../../graphql/resolvers";


const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  resolvers: resolvers,
//   debug: false,
  // context: ({request}) => {
  //     console.log(`  Auth Header ${request.headers['authorization']} `);
  //     return {

  //     }
  // }
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
