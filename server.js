//Port and start server

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
import app from "./app.js";

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {})
  .then(() => console.log("Database connect succesfully!"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running in ${port}`);
});
