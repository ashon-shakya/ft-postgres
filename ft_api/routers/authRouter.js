import express from "express";
import {
  fetchUser,
  fetchUserPG,
  login,
  loginPG,
} from "../controllers/authController.js";
import { logger } from "../middlewares/logMiddleware.js";
import { auth, authPG } from "../middlewares/authMiddleware.js";
const router = express.Router();

if (process.env.DB == "mongo") {
  router.post("/login", logger, login);
  // api/v1/auth/user
  router.get("/user", auth, fetchUser);
} else {
  router.post("/login", loginPG);
  // api/v1/auth/user
  router.get("/user", authPG, fetchUserPG);
}

export default router;
