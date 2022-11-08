const express = require("express");
const cors = require("cors");
// create our Express app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// done! we export it so we can start the site in start.js
module.exports = app;
