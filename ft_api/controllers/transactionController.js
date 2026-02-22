import {
  deleteTransactionById,
  deleteTransactions,
  getTransactions,
  insertTransaction,
} from "../models/transaction/transactionModel.js";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/user/userModel.js";

export const createTransaction = async (req, res) => {
  try {
    // userId
    // type
    // title
    // amount
    // tDate

    req.body.userId = req.user._id;

    const transaction = await insertTransaction(req.body);
    transaction?._id
      ? res.json({
          status: "success",
          message: "New transaction added successfully!",
        })
      : res.json({
          status: "error",
          message: "Unable to add new transaction, try again later",
        });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const fetchTransaction = async (req, res) => {
  try {
    const transactions = await getTransactions(req.user._id);

    return res.json({
      status: "success",
      message: "Transactions Fetched",
      transactions,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const removeTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    // const test = req.query.test;
    const transaction = await deleteTransactionById(req.user._id, id);

    return res.json({
      status: "success",
      message: "Transaction Deleted SuccessFully",
      transaction,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const removeTransactionsByIds = async (req, res) => {
  try {
    const ids = req.body.ids;
    const transaction = await deleteTransactions(req.user._id, ids);

    return res.json({
      status: "success",
      message: "Transactions Deleted SuccessFully",
      transaction,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
