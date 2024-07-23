/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PaeqZRxZQaUS7yHjFJMtoxwCciyTPCD8T9TT4hexiJePibuXIgbYMytDGhQ2p1G57r9il6FNkGZNYIF8Mamg5jt00OWdNudbH"
)

//API

// App config 
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());


// - API routes
app.get('/',(request,response) => response.status(200).send('hello world'))


// - Listen command
express.api = functions.https.onRequest(app)

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
