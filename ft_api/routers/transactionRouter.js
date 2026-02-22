import express from "express";
import {
  createTransaction,
  fetchTransaction,
  removeTransaction,
  removeTransactionsByIds,
} from "../controllers/transactionController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { logger } from "../middlewares/logMiddleware.js";
const router = express.Router();

router.post("/", auth, createTransaction);
router.get("/", auth, fetchTransaction);
router.delete("/:id", auth, removeTransaction);
router.delete("/", auth, removeTransactionsByIds);

export default router;
