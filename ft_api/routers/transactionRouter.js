import express from "express";
import {
  createTransaction,
  createTransactionPG,
  fetchTransaction,
  fetchTransactionPG,
  removeTransaction,
  removeTransactionPG,
  removeTransactionsByIds,
  removeTransactionsByIdsPG,
} from "../controllers/transactionController.js";
import { auth, authPG } from "../middlewares/authMiddleware.js";
const router = express.Router();

if (process.env.DB == "mongo") {
  router.post("/", auth, createTransaction);
  router.get("/", auth, fetchTransaction);
  router.delete("/:id", auth, removeTransaction);
  router.delete("/", auth, removeTransactionsByIds);
} else {
  router.post("/", authPG, createTransactionPG);
  router.get("/", authPG, fetchTransactionPG);
  router.delete("/:id", authPG, removeTransactionPG);
  router.delete("/", authPG, removeTransactionsByIdsPG);
}

export default router;
