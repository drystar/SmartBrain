const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "chris",
    password: "",
    database: "smart-brain"
  }
});

const app = express();

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  // res.send("This is Working");
  res.send(database.users);
});

// signin route
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// register route
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// user id/ profile request route
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// user image route
app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entires[0]);
    })
    .catch(err => res.status(400).json("Unable to Fetch Entires"));
});

app.listen(3000, () => {
  console.log("App is Running on Port 3000 - Looking Good!");
});
