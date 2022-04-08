// named export
import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 8080;
export const DB_URI = process.env.DB_URI;
export const SENTIMENT_URI = process.env.SENTIMENT_URI;
