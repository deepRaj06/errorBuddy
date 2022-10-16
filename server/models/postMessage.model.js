const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    quesFile : {type: String},
    quesError : {type: String},
    ansError : {type: String},
    ansFile : {type: String},
    userId : {type: String}
})
// const postSchema = mongoose.Schema({
//     title : String,
//     message : String,
//     creator : String,
//     tags : [String],
//     selectedFile : [String],
//     likeCount : {
//         type : Number,
//         default : 0
//     },
//     createdAt : {
//         type : Date,
//         default : new Date()
//     }
// })

const postModel = mongoose.model('postMessage', postSchema);

module.exports = {
    postModel
}