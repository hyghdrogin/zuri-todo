import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middleware/auth";
import validator from "../middleware/validator";

import {
  validateSignup, validateLogin
} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const {
  createUser, loginUser, loginPasswordReset, deleteAccount
} = UserController;

router.post("/register", validator(validateSignup), createUser);
router.post("/login", validator(validateLogin), loginUser);
router.patch("/reset-password", verifyToken, loginPasswordReset);

router.delete("/", verifyToken, deleteAccount);

export default router;
