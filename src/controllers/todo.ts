import { Request, Response } from "express";
import { isEmpty } from "lodash";
import Todo from "../models/todo";
import { successResponse, errorResponse, handleError } from "../utils/responses";

/**
 * @class TodoController
 * @description create, get, delete, update Todo
 * @exports TodoController
 */
export default class TodoController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createTodo(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const Todos = await Todo.create({ title, description });
      return successResponse(res, 200, "todo created.", Todos);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async retrieveAllTodo(req: Request, res: Response) {
    try {
      const Todos = await Todo.find({ });
      if (isEmpty(Todos)) {
        return successResponse(res, 204, "No content");
      }
      return successResponse(res, 200, "Todo fetched successfully.", { Total: Todos.length, Todos });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async retrieveTodoById(req: Request, res: Response) {
    try {
      const { todoId } = req.params;
      const Todos = await Todo.findById(todoId);
      if (!Todos) {
        return errorResponse(res, 404, "Todo not found.");
      }
      return successResponse(res, 200, "Todo fetched successfully.", Todos);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async updateTodo(req: Request, res: Response) {
    try {
      const { todoId } = req.params;
      const { description } = req.body;
      const Todos = await Todo.findByIdAndUpdate(todoId, { description }, { new: true });
      return successResponse(res, 200, "Todo updated successfully.", Todos);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async deleteTodo(req: Request, res: Response) {
    try {
      const { todoId } = req.params;
      const Todos = await Todo.findByIdAndDelete(todoId);
      return successResponse(res, 200, "todo deleted successfully.", Todos);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
