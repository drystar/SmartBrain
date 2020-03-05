const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is Working");
});

app.listen(3000, () => {
  console.log("App is Running on Port 3000 - Looking Good!");
});
