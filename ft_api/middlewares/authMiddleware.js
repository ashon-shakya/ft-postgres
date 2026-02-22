import jwt from "jsonwebtoken";
import { get } from "mongoose";
import { getUserByEmail } from "../models/user/userModel.js";
import { poolConfig } from "../config/postgresConfig.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = jwt.verify(token, process.env.JWT_SECRET);

    // go to next available function if valid token
    if (result?.email) {
      const loggedinUser = await getUserByEmail(result.email);

      if (loggedinUser?._id) {
        req.user = loggedinUser;
        req.user.password = "";
        return next();
      }
      return res.status(401).json({
        status: "error",
        message: "Invalid User",
      });
    }

    // send error if invalid token
    return res.status(401).json({
      status: "error",
      message: "Invalid Token",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Invalid Token",
    });
  }
};

export const authPG = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = jwt.verify(token, process.env.JWT_SECRET);

    console.log(1, result);
    // go to next available function if valid token
    if (result?.email) {
      const getUserByEmailQuery = `select * from users where email = $1`;
      const results = await poolConfig.query(getUserByEmailQuery, [
        result.email,
      ]);

      const loggedinUser = results?.rows[0];

      if (loggedinUser?.id) {
        req.user = loggedinUser;
        req.user.password = "";
        return next();
      }
      return res.status(401).json({
        status: "error",
        message: "Invalid User",
      });
    }

    // send error if invalid token
    return res.status(401).json({
      status: "error",
      message: "Invalid Token",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Invalid Token",
    });
  }
};
