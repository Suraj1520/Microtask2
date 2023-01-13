const express = require("express");
const { signin, signup } = require("../Controller/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = userRouter;