import TransactionSchema from "./transactionSchema.js";

// insert

export const insertTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

export const getTransactions = (userId) => {
  return TransactionSchema.find({ userId });
};

// delete
export const deleteTransactions = (userId, idsToDelete) => {
  // [1,2,3,4]

  return TransactionSchema.deleteMany({ userId, _id: { $in: idsToDelete } });
};

export const deleteTransactionById = (userid, id) => {
  return TransactionSchema.deleteOne({ userId: userid, _id: id });
};
