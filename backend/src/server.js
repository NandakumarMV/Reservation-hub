import dotenv from "dotenv";
const envFile = `.env.${process.env.NODE_ENV || "prod"}`;
dotenv.config({ path: envFile });

import cors from "cors";
import express from "express";
import axios from "axios";
import connectMongoDB from "./utils/db.js";
import { errorHandler, AppError } from "./utils/error_handler.js";
import SuperRoutes from "./routes/super_users.js/index.js";
import { verifySuperUserToken } from "./middleware/verify_token.js";

const app = express()

app.use(express.json())
app.use(cors())


connectMongoDB()



app.use("/brewspace/v1/superusers/", cors(), verifySuperUserToken, SuperRoutes)

app.all("*", (req, res, next) => {
  next(new AppError("Route Not Found", 404));
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT} `);
})


