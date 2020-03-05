const express = require("express");

const app = express();

// hard codeed database | will be dynamic later
const database = {
  user: [
    {
      id: "123",
      name: "John",
      email: "johnboy@gmail.com",
      password: cookies,
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Taylor",
      email: "t.aylor@gmail.com",
      password: bananas,
      entries: 0,
      joined: new Date()
    },
    {
      id: "125",
      name: "Emily",
      email: "gurlboss@outlook.ca",
      password: unicorns,
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send("This is Working");
});

// signin route
app.post("/signin", (req, res) => {
  // res.send("signin");
  res.json("signin");
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
