import React from 'react';
import "./styles/index.scss";
// import fetch from "node-fetch";
import { FEEDBACK_SERVICE_URI } from "./environment.js";


const Feedback = () => {
  const [accountNumber, setAccountNumber] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [isPending, setIsPending] = React.useState(false);
  console.log(FEEDBACK_SERVICE_URI);

  async function submitFeedbackMessage(e) {
    e.preventDefault();
    setIsPending(true);
    console.log("Submitting...");
    const feedback_json = {
        "accountNumber": accountNumber,
        "customerName": customerName,
        "feedbackMessage": feedbackMessage
    };
    console.log(feedback_json);
    const apiResponse = await fetch(FEEDBACK_SERVICE_URI, { 
        method: "post",
        body: JSON.stringify(feedback_json),
        headers: { "Content-Type": "application/json",
                   'Accept': 'application/json',
                   'Access-Control-Allow-Origin': "http://localhost:3000",
                   'Access-Control-Allow-Credentials': 'true',
        mode: 'no-cors'
        }
        });
    const apiResponseJson = await apiResponse.json();
    console.log(apiResponseJson);
    setIsPending(false);
  }

  return (
    <><h1>Provide Feedback
    </h1>
    <form onSubmit={submitFeedbackMessage}>
        <label>Account Number:</label>
        <input type="text" 
               required
               value={accountNumber}
               onChange={(e) => setAccountNumber(e.target.value)}
        />
        <label>Your Name:</label>
        <input type="text" 
               required
               value={customerName}
               onChange={(e) => setCustomerName(e.target.value)}
        />
        <label>Your feedback:</label>
        <textarea rows="8" cols="80" required
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
        />
        { !isPending && <button>Submit Feedback</button> }
        { isPending && <button disabled>Submitting...</button> }
        </form>
    </>
  );
};

export default Feedback;
