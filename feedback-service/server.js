import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/environment.js";
import Router from "./config/router.js";
import { connectDB } from "./db/helper.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", Router);

async function startServer() {
  try {
    await connectDB();
    console.log("Mongoose is connected");
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startServer();
