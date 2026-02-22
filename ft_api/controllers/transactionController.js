import { poolConfig } from "../config/postgresConfig.js";
import {
  deleteTransactionById,
  deleteTransactions,
  getTransactions,
  insertTransaction,
} from "../models/transaction/transactionModel.js";

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

// PG
export const createTransactionPG = async (req, res) => {
  try {
    // userId
    // type
    // title
    // amount
    // tDate

    req.body.userId = req.user.id;

    const insertTransactionQuery = `insert into transactions (user_id, amount, title, type, tdate) values ($1,$2,$3,$4,$5) returning *`;

    const results = await poolConfig.query(insertTransactionQuery, [
      req.body.userId,
      req.body.amount,
      req.body.title,
      req.body.type,
      req.body.tDate,
    ]);

    const transaction = results?.rows[0];

    transaction?.id
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

export const fetchTransactionPG = async (req, res) => {
  try {
    const getTransactionQuery = `select * from transactions where user_id = $1`;
    const results = await poolConfig.query(getTransactionQuery, [req.user.id]);
    const transactions = results.rows;

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

export const removeTransactionPG = async (req, res) => {
  try {
    const id = req.params.id;
    // const test = req.query.test;
    const deleteTransactionQuery = `delete from transactions where id = $1 and user_id = $2`;

    const results = await poolConfig.query(deleteTransactionQuery, [
      id,
      req.user.id,
    ]);

    console.log(333, results);

    if (results.rowCount > 0) {
      return res.json({
        status: "success",
        message: "Transaction Deleted SuccessFully",
      });
    } else {
      return res.json({
        status: "error",
        message: "Transaction Could not be deleted",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const removeTransactionsByIdsPG = async (req, res) => {
  try {
    const ids = req.body.ids;
    const deleteTransactionsQuery = `delete from transactions where id in (${ids.join(",")}) and user_id = ${req.user.id}`;
    const results = await poolConfig.query(deleteTransactionsQuery);
    return res.json({
      status: "success",
      message: "Transactions Deleted SuccessFully",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
