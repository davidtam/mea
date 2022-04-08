import mongoose from "mongoose";
import { DB_URI } from "../config/environment.js";

export async function connectDB() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return mongoose.connect(DB_URI, options);
}
