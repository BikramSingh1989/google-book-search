import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { authMiddleware } from "./utils/auth";
import { typeDefs, resolvers } from "./schemas";
import db from "./config/connection";

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const app: Application = express(); // Ensuring compatibility

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();

  // Force Apollo to use the same Express as your project
  (server as any).applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:3001${server.graphqlPath}`);
    });
  });
};

startServer();


