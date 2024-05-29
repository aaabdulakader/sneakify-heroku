const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const DB = require(`${__dirname}/data/dbConnection`);
const path = require("path");

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app`);

DB();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), (err) => {
    if (err) {
      res.status((500).send(err));
    }
  });

  next();
});

const port = process.env.PORT;

//  start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
