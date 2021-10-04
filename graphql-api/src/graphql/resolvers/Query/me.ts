import { getUserById } from "../../../repositories";
import { QueryResolvers } from "../../../generated/graphql";

export const me: QueryResolvers["me"] = (_, __, ctx) =>
  getUserById(ctx.userId, ctx);
