import { Router } from "express";
import TodoController from "../controllers/todo";
import Authentication from "../middleware/auth";
import validator from "../middleware/validator";
import { validateId, validateTodo } from "../validations/todo";

const router = Router();
const {
  createTodo, retrieveAllTodo, retrieveTodoById, updateTodo, deleteTodo
} = TodoController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateTodo), createTodo);

router.get("/", verifyToken, retrieveAllTodo);
router.get("/:todoId", verifyToken, validator(validateId), retrieveTodoById);

router.patch("/:todoId", verifyToken, validator(validateId), updateTodo);
router.delete("/:todoId", verifyToken, validator(validateId), deleteTodo);

export default router;
