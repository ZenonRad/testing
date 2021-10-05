import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { MongoMemoryServer } from "mongodb-memory-server";
var Redis = require("ioredis-mock");

import { IContext, IUser } from "../../types";
import { createModels } from "../../database";
import { schema } from "../utils";

const redis = new Redis({});

const mongod = new MongoMemoryServer();
const { userModel, openMongooseConnection } = createModels();

const ctx: IContext = {
  userModel,
  redis,
  authorization: "",
  userId: "",
};

const server = new ApolloServer({
  schema,
  context: () => ctx,
  tracing: true,
});

const { mutate } = createTestClient(server);

beforeAll(async () => {
  await mongod.start();
  await openMongooseConnection(mongod.getUri());
});

afterAll(async () => {
  ctx.redis.disconnect();
  await mongod.stop();
  await server.stop();
});
