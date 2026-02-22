import express from "express";
import { createUser, createUserPG } from "../controllers/userController.js";
import { logger } from "../middlewares/logMiddleware.js";
const router = express.Router();

if (process.env.DB == "mongo") {
  router.post("/", logger, createUser);
} else {
  router.post("/", createUserPG);
}
export default router;
