const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../config.env` });

const DB_connection = async () => {
  const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );

  try {
    await mongoose.connect(DB);
    // console.log(s);
    console.log("DB connection successful!");
  } catch (error) {
    console.error("Error connecting to DB...:", error);
  }
};

module.exports = DB_connection;
