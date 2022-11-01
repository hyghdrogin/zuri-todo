import { Schema, model } from "mongoose";
import { UserInterface } from "../utils/interface";

const userSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    username: {
      type: String, unique: true, maxlength: 15, trim: true, lowercase: true
    },
    password: { type: String },
  },
  { timestamps: true }
);

export default model<UserInterface>("User", userSchema);
