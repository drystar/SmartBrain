const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

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
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("Unable to get User"));
      } else {
        res.status(400).json("Invalid Credentials");
      }
    })
    .catch(err => res.status(400).json("Invalid Credentials"));
});

// register route
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.comit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to Join"));
});

// user id/ profile request route
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch(err => res.stauts(400).json("Error Finding User"));
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
