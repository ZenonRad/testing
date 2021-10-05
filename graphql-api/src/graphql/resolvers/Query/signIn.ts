import {
  checkPassword,
  generateAccessToken,
  getUserByEmail,
  sendHistory,
} from "../../../repositories";
import { QueryResolvers } from "../../../generated/graphql";

export const signIn: QueryResolvers["signIn"] = async (
  _,
  { email, password },
  ctx,
) => {
  const user = await getUserByEmail(email, ctx);
  checkPassword(password, user.password);

  const accessToken = generateAccessToken(user);
  await ctx.redis.hset("session", accessToken, user.id);

  await sendHistory({ key: "Sign In", values: { email } });

  return accessToken;
};
