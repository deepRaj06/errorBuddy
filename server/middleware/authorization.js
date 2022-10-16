const {userModel} = require("../models/user.model.js");

const authorization = () => {

    return async (req, res, next) => {

        const {username} = req.body;
        const user = await userModel.findOne({username});

        if(user.username.includes("new@new.com")){
            next()
        }
        else{
            res.status(404).send("You are not authorized!")
        }
    }
}

module.exports = {authorization}