import { encryptPassword, generateAccessToken } from "../../../repositories";
import { MutationResolvers } from "../../../generated/graphql";

export const signUp: MutationResolvers["signUp"] = async (
  _,
  { name, email, password },
  ctx,
) => {
  const user = new ctx.userModel({
    name,
    email,
    password: encryptPassword(password),
  });

  await user.save();

  const accessToken = generateAccessToken(user);
  await ctx.redis.hset("session", accessToken, user.id);

  return accessToken;
};
