import express from "express";
import { fetchUser, login } from "../controllers/authController.js";
import { logger } from "../middlewares/logMiddleware.js";
import { auth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", logger, login);
// api/v1/auth/user
router.get("/user", auth, fetchUser);

export default router;
