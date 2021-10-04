import { userSchema } from "./schema";
import { IContext, IUser } from "../types";
import { getMongooseConnection } from "../mongoose";

const { connection, openConnection } = getMongooseConnection();

export const createModels = (): Pick<IContext, "userModel"> & {
  openMongooseConnection: (mongoUrl: string) => Promise<void>;
} => {
  const userModel = connection.model<IUser>("User", userSchema, "User");

  return {
    userModel,
    openMongooseConnection: (mongoUrl: string) =>
      openConnection(mongoUrl, connection),
  };
};
