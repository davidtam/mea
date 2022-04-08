import Feedback from "../models/Feedback.js";
import fetch from "node-fetch";
import { SENTIMENT_URI } from "../config/environment.js";

async function getAllFeedbacks(req, res, next) {
  try {
    const feedbacks = await Feedback.find();
    return res.status(200).send(feedbacks);
  } catch (e) {
    next(e);
  }
}

async function createFeedback(req, res, next) {
  try {
    var fb = req.body;
    var sen_req = {};
    sen_req["message"] = req.body.feedbackMessage;
    const apiResponse = await fetch(SENTIMENT_URI, {
      method: "post",
      body: JSON.stringify(sen_req),
      headers: { "Content-Type": "application/json" },
    });
    const apiResponseJson = await apiResponse.json();
    console.log(sen_req);
    console.log(apiResponseJson);
    fb.sentimentScore = apiResponseJson;
    return res.status(201).send(await Feedback.create(fb));
  } catch (e) {
    next(e);
  }
}

async function deleteFeedback(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (feedback) {
      return res.status(204).send(feedback);
    } else {
      return res
        .status(404)
        .send({ message: `feedback ${req.params.id} does not exist` });
    }
  } catch (e) {
    next(e);
  }
}

export default { getAllFeedbacks, createFeedback, deleteFeedback };
