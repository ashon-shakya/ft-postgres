import { getUserByEmail } from "../models/user/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { poolConfig } from "../config/postgresConfig.js";

export const login = async (req, res) => {
  try {
    //req.body
    // email
    // password
    // fetch user with email

    const user = await getUserByEmail(req.body.email);

    if (user) {
      const isMatched = bcrypt.compareSync(req.body.password, user.password);

      const tokenPayload = {
        email: req.body.email,
      };

      //   password matched
      if (isMatched) {
        const accessJWT = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        user.password = "";

        res.json({
          status: "success",
          message: "USER LOGGED IN",
          accessJWT,
          user,
        });
      } else {
        res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(401).json({
        status: "error",
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    return res.send({
      status: "success",
      message: "User Data fetched",
      user: req.user,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const loginPG = async (req, res) => {
  try {
    //req.body
    // email
    // password
    // fetch user with email

    const getUserQuery = "select * from users where email = $1";
    const results = await poolConfig.query(getUserQuery, [req.body.email]);

    if (results.rows.length > 0) {
      const user = results.rows[0];
      const isMatched = bcrypt.compareSync(req.body.password, user.password);

      const tokenPayload = {
        email: req.body.email,
      };

      //   password matched
      if (isMatched) {
        const accessJWT = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        user.password = "";

        res.json({
          status: "success",
          message: "USER LOGGED IN",
          accessJWT,
          user,
        });
      } else {
        res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(401).json({
        status: "error",
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const fetchUserPG = async (req, res) => {
  try {
    return res.send({
      status: "success",
      message: "User Data fetched",
      user: req.user,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
