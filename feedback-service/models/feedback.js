import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  accountNumber: String,
  customerName: String,
  feedbackMessage: String,
  sentimentScore: Map,
});

const Feedback = mongoose.model("feedback", feedbackSchema);
export default Feedback;
