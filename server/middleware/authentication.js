const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send("Login again");
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(404).send({ message: err.message });
        // res.json("Please Login again")
      } else {
        // From here id is going to posts userId
        req.body.userId = decoded.userId;
        req.body.username = decoded.username;
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  authentication,
};
