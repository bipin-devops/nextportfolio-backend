const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const projectRoutes = require("./src/routes/projects.js");
const app = express();

app.use(express.json());
app.use("/projects", projectRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
  } catch (error) {
    console.log("Fail to connect to database", error);
  }
};

connectDB();
