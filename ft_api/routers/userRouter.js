import express from "express";
import { createUser } from "../controllers/userController.js";
import { logger } from "../middlewares/logMiddleware.js";
const router = express.Router();

router.post("/", logger, createUser);

export default router;
