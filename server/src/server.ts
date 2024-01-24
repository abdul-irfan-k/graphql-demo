import { ApolloServer } from "@apollo/server";
import { connectDB } from "./db/connect.js";
import { resolvers } from "./resolver/index.js";
import { mergedGQLSchema } from "./schema/index.js";
import { startStandaloneServer } from "@apollo/server/standalone";

interface MyContext {
  token?: String;
}

connectDB(() => {
  const server = new ApolloServer<MyContext>({
    typeDefs: mergedGQLSchema,
    resolvers,
  });
  startStandaloneServer(server, { listen: { port: 9000 } }).then(
    (serverInfo) => {
      console.log("started "+serverInfo.url);
    }
  );
});
