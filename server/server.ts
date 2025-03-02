import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { authMiddleware } from "./utils/auth";
import { typeDefs, resolvers } from "./schemas";
import db from "./config/connection";
import cors from "cors";

const PORT = process.env.PORT || 4000; 

const startServer = async () => {
  const app: Express = express(); 

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();

   (server as any).applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`); 
    });
  });
};

startServer();
