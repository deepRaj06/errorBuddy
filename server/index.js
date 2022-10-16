const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connection } = require("./config/db.js");
const { userRoute } = require("./routes/user.route.js");
const { postRoute } = require("./routes/posts.route.js");
const { postModel } = require("./models/postMessage.model.js");
const { authentication } = require("./middleware/authentication.js");
const path = require("path");
const { authorization } = require("./middleware/authorization.js");

// const {authorization} = require("./middleware/authorization.js")
// const abc = require('./uploads')

const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
// app.use("/images", express.static(path.join("backend/images")));

app.use(cors());

app.get("/", async (req, res) => {
  // res.send("Welcome to Bugman!")
  try {
    // Finding something inside model takes time
    // this is reason for async
    const postMessages = await postModel.find();
    postMessages && res.status(200).json(postMessages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

app.delete("/delete/:postId", async (req, res) => {
    const {postId} = req.params;
    // console.log(req.body)
    const remainingPost = await postModel.findByIdAndDelete({ _id : postId});
  
    try {
      if(remainingPost)
        res.status(201).json("Post Deleted");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
  });

app.use("/user", userRoute);
app.use(authentication);
app.use("/posts", postRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to port ${PORT}`);
  } catch (err) {
    console.log("Error connected to db");
    console.log(err);
  }
});
