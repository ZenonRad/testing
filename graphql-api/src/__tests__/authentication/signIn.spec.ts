import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { MongoMemoryServer } from "mongodb-memory-server";
var Redis = require("ioredis-mock");

import { IContext } from "../../types";
import { createModels } from "../../database";
import { schema } from "../utils";
import { encryptPassword } from "../../repositories";

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

describe("given that I have already an account", () => {
  const name = "John Doe";
  const email = "johndoe@gmail.com";
  const password = "secret";

  beforeAll(async () => {
    const me = new userModel({
      name,
      email,
      password: encryptPassword(password),
    });

    await me.save();
  });

  describe("when I sign in", () => {
    const SIGN_IN = gql`
      query SignIn($email: String!, $password: String!) {
        accessToken: signIn(email: $email, password: $password)
      }
    `;

    it("then new session is opened", async () => {
      const res = await mutate<
        { accessToken: string },
        { email: string; password: string }
      >({
        mutation: SIGN_IN,
        variables: { email, password },
      });

      const session = await ctx.redis.hget("session", res.data!.accessToken);
      const user = await userModel.findOne({ email });
      expect(session).toBe(user!.id);
    });

    it.skip("then a sign in history should be pushed", async () => {
      const repositories = require("../../repositories");
      const spy = jest.spyOn(
        repositories,
        "sendHistory",
      ); /*.mockImplementation()*/

      await mutate<
        { accessToken: string },
        { email: string; password: string }
      >({
        mutation: SIGN_IN,
        variables: { email, password },
      });

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ key: "Sign In", values: { email } }),
      );
    });
  });
});
