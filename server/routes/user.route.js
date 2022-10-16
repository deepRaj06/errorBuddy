const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const { userModel } = require("../models/user.model.js");

const userRoute = Router();
// Signup

userRoute.post("/signup", (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (name && username && password) {
      bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          res.json("Signup Failed!");
          // res.json(err)
        }

        const user = new userModel({
          name,
          username,
          password: hash,
        });

        await user.save();
        res.json("Signup Done!");
      });
    } else {
      return res.status(400).send("All fields are required");
      // res.send("All fields are required")
    }
  } catch (err) {
    res.send(err.message);
  }
});

// Login

userRoute.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const user = await userModel.findOne({ username });
      const hash = user.password;

      hash && bcrypt.compare(password, hash, function (err, result) {
          if (err) {
            return res.status(400).send({message : "Login failed!"});
          }

          if (result) {
            const token = jwt.sign( { userId: user._id, username: user.username },process.env.JWT_SECRET);
            return res.json({ message: "Login Successful", token: token, user: user });
          } else {
            res.json("Invalid credentials");
          }
        });
    }
  } catch (error) {
    res.send(error.message);
  }
});

userRoute.get("/", async (req, res) => {
  try {
    // Finding something inside model takes time
    // this is reason for async
    const userDetails = await userModel.find();
    userDetails && res.status(200).json(userDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  userRoute,
};
