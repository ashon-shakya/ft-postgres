import express from "express";
import "dotenv/config";
import { conMongoDb } from "./config/mongodbConfig.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT;

// Mongo connection
conMongoDb();

// Middlewares
app.use(express.json());
app.use(cors());

// entry
app.get("/", (req, res) => {
  return res.send("FINANCIAL TRACKKER APPILCATION APIs");
});

// User Router
import userRouter from "./routers/userRouter.js";
app.use("/api/v1/users", userRouter);

// Auth Router
import authRouter from "./routers/authRouter.js";
app.use("/api/v1/auth", authRouter);

// Transaction Router
import transactionRouter from "./routers/transactionRouter.js";
app.use("/api/v1/transactions", transactionRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running ar http://localhost:${PORT}`);
});
