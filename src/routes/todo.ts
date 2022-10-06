import { Router } from "express";
import TodoController from "../controllers/todo";
import validator from "../middleware/validator";
import { validateId, validateTodo } from "../validations/todo";

const router = Router();
const {
  createTodo, retrieveAllTodo, retrieveTodoById, updateTodo, deleteTodo
} = TodoController;

router.post("/todo/", validator(validateTodo), createTodo);

router.get("/todos/", validator(validateId), retrieveAllTodo);
router.get("/todo/:todoId", validator(validateId), retrieveTodoById);

router.patch("/todo/:todoId", validator(validateId), updateTodo);
router.delete("/todo/:todoId", validator(validateId), deleteTodo);

export default router;
