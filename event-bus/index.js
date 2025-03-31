const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(bodyParser.json());

app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
