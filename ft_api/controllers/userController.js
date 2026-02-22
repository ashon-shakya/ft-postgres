import { insertUser } from "../models/user/userModel.js";
import bcrypt from "bcryptjs";
import { poolConfig } from "../config/postgresConfig.js";

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

export const createUserPG = async (req, res) => {
  try {
    // req.body
    // name
    // email
    // password

    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(req.body.password, salt);

    const insertUserQuery = `insert into users (name, email, password) values ($1, $2, $3) RETURNING *`;

    const user = await poolConfig.query(
      insertUserQuery,
      [req.body.name, req.body.email, req.body.password],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.json({
            status: "error",
            message: error.message,
          });
        }
        console.log(results.rows[0].id);
        return res.json({
          status: "success",
          message: "User created successfully",
        });
      },
    );
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
