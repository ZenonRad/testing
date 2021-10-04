import { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },

    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },

    password: {
      type: Schema.Types.String,
      required: true,
    },
  },

  { collection: "User", minimize: false, timestamps: true, strict: true }
);
