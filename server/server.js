const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const DB = require(`${__dirname}/data/dbConnection`);

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app`);

DB();

const port = process.env.PORT;

//  start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
