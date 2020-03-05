const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
// app.use(express.json());

// hard codeed database | will be dynamic later
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "johnboy@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Taylor",
      email: "t.aylor@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    },
    {
      id: "125",
      name: "Emily",
      email: "gurlboss@outlook.ca",
      password: "unicorns",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  // res.send("This is Working");
  res.send(database.users);
});

// signin route
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

// register route
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "126",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
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
