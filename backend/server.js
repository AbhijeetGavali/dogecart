// require all dependancies to use
const express = require("express");

// creating an express app
const app = express();

// sample to check if runing in production
app.get("/", (req, res) => {
  res.send("hello world!");
});

// defining port number
const PORT = process.env.PORT || 5000;

// listing on port
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
