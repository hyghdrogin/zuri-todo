import { Request, Response } from "express";
import { isEmpty } from "lodash";
import models from "../models";
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
      const { _id } = req.person;
      const { title, description } = req.body;
      const Todos = await models.Todo.create({ title, description, user_id: _id });
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
      let { page, limit }: any = req.query;
      // eslint-disable-next-line no-mixed-operators
      if (page === undefined || null && limit === undefined || null) {
        page = 1;
        limit = 5;
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const todos = await models.Todo.find({ })
        .limit(endIndex)
        .skip(startIndex)
        .exec();
      if (isEmpty(todos)) {
        return successResponse(res, 204, "No content");
      }
      const count = await models.Todo.countDocuments();
      let totalPages = Math.floor(count / limit);
      if (totalPages === 0) totalPages = 1;
      const total = todos.length;
      return successResponse(
        res,
        200,
        "Todo fetched successfully.",
        {
          total,
          totalPages,
          currentPage: page,
          todos
        }
      );
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
      const Todos = await models.Todo.findById(todoId);
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
      const Todos = await models.Todo.findByIdAndUpdate(todoId, { description }, { new: true });
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
      const Todos = await models.Todo.findByIdAndDelete(todoId);
      return successResponse(res, 200, "todo deleted successfully.", Todos);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
