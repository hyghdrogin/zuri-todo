import { Request, Response } from "express";
import bcrypt from "bcrypt";
import models from "../models";
import {
  successResponse,
  errorResponse,
  handleError,
} from "../utils/responses";
import jwtHelper from "../utils/jwt";
import { UserInterface } from "../utils/interface";

const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createUser(req: Request, res: Response) {
    try {
      const {
        username, email, password, retypePassword
      } = req.body;
      const emailExist = await models.User.findOne({ email });
      if (emailExist) {
        return errorResponse(
          res,
          409,
          "email already registered by another user."
        );
      }
      const usernameExist = await models.User.findOne({ username });
      if (usernameExist) {
        return errorResponse(
          res,
          409,
          "Username already registered by another user."
        );
      }
      if (password !== retypePassword) {
        return errorResponse(res, 409, "Password mismatch.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await models.User.create({
        username,
        email,
        password: hashedPassword,
      });
      return successResponse(
        res,
        201,
        "Account created successfully."
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await models.User.findOne({
        $or: [{ email: username }, { username }],
      });
      if (!user) {
        return errorResponse(res, 404, "Username or Email does not exist.");
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return errorResponse(res, 404, "Password is not correct!.");
      }
      const { _id, email } = user;
      const token = await generateToken({ _id, email });
      const todos = await models.Todo.find({ user_id: _id }).countDocuments();
      const userDetails = {
        _id,
        username,
        todos
      };
      return successResponse(res, 200, "User Logged in Successfully.", {
        token,
        userDetails,
      });
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
  static async loginPasswordReset(req: Request, res: Response) {
    try {
      const { _id } = req.person;
      const user: UserInterface | null = await models.User.findById({ _id });
      const { oldPassword, newPassword, retypeNewPassword } = req.body;
      if (user?.password != null) {
        const passwordCheck = await bcrypt.compare(oldPassword, user.password);
        if (!passwordCheck) {
          return errorResponse(res, 404, "Old Password is not correct!.");
        }
      }
      if (newPassword !== retypeNewPassword) {
        return errorResponse(res, 409, "Password mismatch.");
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await models.User.findByIdAndUpdate(
        { _id },
        { password: hashedPassword }
      );
      return successResponse(res, 200, "Password reset successfully.");
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
  static async deleteAccount(req: Request, res: Response) {
    try {
      const { _id } = req.person;
      await models.User.findByIdAndDelete({ _id });
      return successResponse(
        res,
        200,
        "Account deleted successfully."
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
