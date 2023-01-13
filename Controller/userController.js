const UserModel = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI ";
const signup = async (req, res) => {

  const { username, email, password } = req.body;
  try {

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await UserModel.create({
      email: email,
      password: hashPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });} 

    catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      res.status(400).json({ message: "Invalid Credetential" });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id },SECRET_KEY);
    res.status(201).json({ user: existingUser, token: token });}

    catch (error) {
    console.log("error");
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { signup, signin };
