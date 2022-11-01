import { Schema, model } from "mongoose";
import { ITodo } from "../utils/interface";

const todoSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
}, { timestamps: true });

export default model<ITodo>("Todo", todoSchema);
