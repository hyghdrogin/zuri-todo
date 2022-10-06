import Joi from "joi";
import objectId from "./common";

export const validateTodo = {
  body: Joi.object({
    title: Joi.string().min(2).max(150).required(),
    description: Joi.string().min(2).max(3000).required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const validateId = {
  params: Joi.object({
    todoId: objectId.messages({
      "any.required": "Todo is required.",
      "string.length": "Todo id must be a valid mongoose id.",
    }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};
