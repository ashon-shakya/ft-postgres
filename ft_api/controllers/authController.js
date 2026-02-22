import { getUserByEmail } from "../models/user/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
