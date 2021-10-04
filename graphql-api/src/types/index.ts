import { Document, Model } from "mongoose";
import { Redis } from "ioredis";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface IContext {
  userModel: Model<IUser, {}>;
  redis: Redis;
  authorization: string;
  userId: string;
}
