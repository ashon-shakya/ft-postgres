import { insertUser } from "../models/user/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    // req.body
    // name
    // email
    // password

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = await insertUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "User created successfully",
          user,
        })
      : res.json({
          status: "error",
          message: "Error creating user!",
        });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
