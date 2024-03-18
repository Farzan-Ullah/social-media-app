const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded());

const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
});

app.get("/", (req, res) => {
  res.send("New Express Server");
});

//Read (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "SUCCESS",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something Went Wrong!",
    });
  }
});

//Create (POST)
app.post("/users", async (req, res) => {
  const { firstName, lastName, classNumber } = req.body;
  try {
    await User.create({
      firstName,
      lastName,
      class: classNumber,
    });
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something Went Wrong!",
    });
  }
});

//update (PATCH)
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, classNumber } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      class: classNumber,
    });
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something Went Wrong!",
    });
  }
});

//DELETE (DELETE)
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something Went Wrong!",
    });
  }
});

//Search Users
app.get("/users", async (req, res) => {
  try {
    console.log(req.query);
    const { firstName, lastName, classNumber } = req.query;
    const query = {};
    if (firstName) {
      query.firstName = firstName;
    }
    if (lastName) {
      query.lastName = lastName;
    }
    if (classNumber) {
      query.class = classNumber;
    }
    const users = await User.find(query);
    res.json({
      status: "SUCCESS",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something Went Wrong!",
    });
  }
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Server is up :)"))
    .catch((error) => console.log(error));
});
