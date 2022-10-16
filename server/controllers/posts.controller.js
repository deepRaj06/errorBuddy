
// const {postModel} = require("../models/postMessage.model.js")
// const getPosts = async(req, res) => {
//     try {
//         // Finding something inside model takes time 
//         // this is reason for async
//         const postMessages = await postModel.find()
//         res.status(200).json("Post Messages", postMessages)
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({message : error.message});
//     }
// }

// const createPost = async(req, res) => {
//     const payload = req.body;
//     const newPost = new postModel(payload)

//     try {
//         await newPost.save()
//         res.status(201).json("Post created")
//     } catch (error) {
//         res.status(409).json( { message : error.message } )
//     }
// }

// module.exports = {
//     getPosts,
//     createPost
// }