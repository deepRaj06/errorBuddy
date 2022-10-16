const { Router } = require("express");
const { authentication } = require("../middleware/authentication.js");
const { authorization } = require("../middleware/authorization.js");
// const { getPosts, createPost } = require("../controllers/posts.controller");
const { postModel } = require("../models/postMessage.model.js");
// const path = require('path');
const postRoute = Router();

postRoute.get("/", async (req, res) => {
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

postRoute.post("/create", async (req, res) => {

  let {quesFile, quesError, ansError, userId, ansFile} = req.body;

  const newPost = new postModel({
    quesFile,
    quesError,
    ansError,
    ansFile,
    userId
  });
  // console.log(newPost.quesFile)
  try {
    await newPost.save();
    res.status(201).json("Post created");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

postRoute.patch("/edit/:postId", async (req, res) => {
  const {postId} = req.params;
  const updatedPost = await postModel.findByIdAndUpdate({ _id : postId, userId : req.body.userId}, {...req.body});

  try {
    if(updatedPost)
      res.status(201).json("Post Updated");
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
});

postRoute.delete("/delete/:postId",authorization(), async (req, res) => {
  const {postId} = req.params;
  const remainingPost = await postModel.findByIdAndDelete({ _id : postId, userId : req.body.userId});

  try {
    if(remainingPost)
      res.status(201).json("Post Deleted");
  } catch (error) {
      res.status(409).json({ message: error });
  }
})

// postRoute.get( "/", getPosts)
// postRoute.get( "/create", createPost)

module.exports = {
  postRoute
};
