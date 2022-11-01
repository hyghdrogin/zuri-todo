import { Router } from "express";
import userRoutes from "./user";
import todoRoutes from "./todo";

const router = Router();

router.use("/users", userRoutes);
router.use("/todos", todoRoutes);

export default router;
