const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

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
  res.send("This is Working");
  // res.send(database.users);
});

// signin route
app.post("/signin", signin.handleSignin(db, bcrypt));

// register route
app.post("/register", register.handleRegister(db, bcrypt));

// user id/ profile request route
app.get("/profile/:id", profile.handleProfileGet(db));

// user image route
app.put("/image", image.handleImage(db));

// user image route Url
app.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is Running on Port ${process.env.PORT} - Looking Good!`);
});

console.log(process.env);
