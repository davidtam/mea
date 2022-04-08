import express from "express";
import feedbackController from "../controllers/feedbackController.js";

const Router = express.Router();

Router.route("/feedback")
  .get(feedbackController.getAllFeedbacks)
  .post(feedbackController.createFeedback);

export default Router;
