import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import config from "../config";
import { IContext, IUser } from "../types";

export const getUserById = async (
  id: string,
  ctx: Pick<IContext, "userModel">,
): Promise<IUser> => {
  const user: IUser | null = await ctx.userModel.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  return user;
};

export const getUserByEmail = async (
  email: string,
  ctx: Pick<IContext, "userModel">,
): Promise<IUser> => {
  const user: IUser | null = await ctx.userModel.findOne({ email });
  if (!user) throw new Error("Email does not exist");
  return user;
};

export const generateAccessToken = (user: IUser): string =>
  jwt.sign({ id: user.id }, config.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "12h",
  });

export const encryptPassword = (password: string): string =>
  bcrypt.hashSync(password, 3);

export const checkPassword = (
  passwordToCheck: string,
  referencePassword: string,
) => {
  if (!bcrypt.compareSync(passwordToCheck, referencePassword))
    throw new Error("Password incorrect");
};
