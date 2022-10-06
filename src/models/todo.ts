import { Schema, model } from "mongoose";
import { ITodo } from "../utils/interface";

const todoSchema = new Schema({
  title: { type: String },
  description: { type: String },
}, { timestamps: true });

export default model<ITodo>("Todo", todoSchema);
