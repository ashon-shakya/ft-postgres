import UserModel from "./userSchema.js";

// C
export const insertUser = (userObj) => {
  return UserModel(userObj).save();
};

// R
export const getUserByEmail = (email) => {
  return UserModel.findOne({ email });
};
