import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import resolvers from "./graphql/resolvers";
import config from "./config";
import { createModels } from "./database/model";
import { IContext } from "./types";
import { redis } from "./redis";
import "graphql-import-node";

const typeDefs = require("./graphql/schema.graphql");

const { userModel, openMongooseConnection } = createModels();
openMongooseConnection(config.MONGO_URL);

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      //@ts-ignore
      resolvers,
    },
  ]),

  context: ({ req }): IContext => {
    return {
      userModel,
      authorization: req.headers["authorization"] as string,
      userId: req.headers["user-id"] as string,
      redis,
    };
  },
});

server.listen({ port: config.PORT }).then(async ({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
