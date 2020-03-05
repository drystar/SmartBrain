const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is Working");
});

app.listen(3000, () => {
  console.log("App is Running on Port 3000 - Looking Good!");
});

/*
/ -- res = this is working
/ signin --> POST success/ fail
/ register --> POST = user
/ profile/:userId --> GET = user
/ image --> PUT --> user

*/
