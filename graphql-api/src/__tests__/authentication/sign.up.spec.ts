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

describe("given that there is no account associated to my email address", () => {
  const email = "johndoe@gmail.com";

  beforeEach(async () => {
    await userModel.remove({ email });
  });

  describe("when I sign up", () => {
    const name = "John Doe";
    const password = "secret";

    const SIGN_UP = gql`
      mutation SignUp($name: String!, $email: String!, $password: String!) {
        accessToken: signUp(name: $name, email: $email, password: $password)
      }
    `;

    it("then new user is saved", async () => {
      const expectation = expect.objectContaining<
        Pick<IUser, "_id" | "name" | "email" | "password">
      >({
        _id: expect.anything(),
        name,
        email,
        password: expect.anything(),
      });

      await mutate<
        { accessToken: string },
        { name: string; email: string; password: string }
      >({
        mutation: SIGN_UP,
        variables: { name, email, password },
      });

      const user = await userModel.findOne({ email });
      expect(user).toEqual(expectation);
    });

    it("then new session is opened", async () => {
      const res = await mutate<
        { accessToken: string },
        { name: string; email: string; password: string }
      >({
        mutation: SIGN_UP,
        variables: { name, email, password },
      });

      const session = await ctx.redis.hget("session", res.data!.accessToken);
      const user = await userModel.findOne({ email });
      expect(session).toBe(user!.id);
    });

    it.todo("then save encrypted password");
  });
});
