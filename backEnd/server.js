const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "chris",
    password: "",
    database: "smart-brain"
  }
});

// // check with test query
// console.log(postgres.select("*").from("users"));

// check with test query to access users data
postgres
  .select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

// hard codeed database | will be dynamic later
const database = {
  users: [
    {
      id: "123",
      name: "John",
      password: "cookies",
      email: "johnboy@gmail.com",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Taylor",
      password: "apples",
      email: "t.aylor@gmail.com",
      entries: 0,
      joined: new Date()
    },
    {
      id: "125",
      name: "Emily",
      password: "unicorns",
      email: "gurlboss@outlook.ca",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "johnboy@gmail.com"
    }
  ]
};

app.get("/", (req, res) => {
  // res.send("This is Working");
  res.send(database.users);
});

// signin route
app.post("/signin", (req, res) => {
  // bcrypt.compare(
  //   "cheese",
  //   $2a$10$RCTTayyBKXz0TiO2BCG / VuFNbhCex7wbTHuO52WbOXsVDoWjDwxky,
  //   function(err, res) {
  //     console.log("first guess", res);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   $2a$10$RCTTayyBKXz0TiO2BCG / VuFNbhCex7wbTHuO52WbOXsVDoWjDwxky,
  //   function(err, res) {
  //     console.log("secxond guess", res);
  //   }
  // );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

// register route
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
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

// user id/ profile request route
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("Invalid User Id ");
  }
});

// user image route
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user).entires;
    }
  });
  if (!found) {
    res.status(404).json("Sorry Not Found ");
  }
});

app.listen(3000, () => {
  console.log("App is Running on Port 3000 - Looking Good!");
});
