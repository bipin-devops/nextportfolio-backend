const cors = require("cors");
const express = require("express");

const mongoose = require("mongoose");
const projectRoutes = require("./src/routes/projects.js");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/projects", projectRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // app.listen(process.env.PORT);
  } catch (error) {
    console.log("Fail to connect to database", error);
  }
};

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running in: ${process.env.PORT}`);
  connectDB();
});

// connectDB();

module.exports = { app, server };
