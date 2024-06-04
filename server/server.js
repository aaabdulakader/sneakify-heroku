const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const DB = require(`${__dirname}/data/dbConnection`);
const path = require("path");

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app`);

DB();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

const port = process.env.PORT;

//  start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
