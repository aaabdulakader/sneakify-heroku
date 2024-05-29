const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Product = require("./../models/productModel");
const User = require("./../models/userModel");
const DB = require(`${__dirname}/dbConnection`);

dotenv.config({ path: `${__dirname}/../config.env` });

// Database connection
DB();

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const importData = async () => {
  if (process.argv[2] === "--import") {
    try {
      await Product.create(products);
      await User.create(users);
      console.log("Data successfully loaded!");
    } catch (error) {
      console.error("Error loading data...:", error);
    }
    process.exit();
  } else if (process.argv[2] === "--delete") {
    try {
      await Product.deleteMany();
      await User.deleteMany();
      console.log("Data successfully deleted!");
    } catch (error) {
      console.error("Error deleting data...:", error);
    }
    process.exit();
  }
};

importData();
