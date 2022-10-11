const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../util/validateEmail");
const ObjectId = require("mongoose").Types.ObjectId;

const registerUser = async (req, res) => {
  if (!(req.body.name && req.body.email && req.body.password)) {
    // one of the fields is not filled
    return res.status(400).json({ error: "All fields are required" });
  }

  // checking is email is valid
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // checking if email is in db already
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ error: "Email is already registered" });
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // creating a new user
  User.create({
    ...req.body,
    password: hashedPassword,
  })
    .then((result) => {
      const token = jwt.sign({ _id: result._id }, process.env.TOKENSECRET);
      res
        .header("auth-token", token)
        .json({ response: "Registered", "auth-token": token, ...result._doc });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const loginUser = async (req, res) => {
  if (!(req.body.email && req.body.password)) {
    // one of the fields is not filled
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  // checking is email is valid
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // checking if email is in db already
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "This email is not registered" });
  }

  // checking the password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json({ error: "Wrong password" });
  }

  // logged & token
  const token = jwt.sign({ _id: user._id }, process.env.TOKENSECRET);
  res
    .header("auth-token", token)
    .json({ response: "Logged in", "auth-token": token, name: user.name });
};

const editPassword = async (req, res) => {
  const id = req.params.id;

  if (!req.body.password) {
    return res
      .status(400)
      .json({ error: "You need to provide a new password" });
  }

  // checking if the id is a valid one
  const validID = ObjectId.isValid(id);
  if (!validID) return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await User.findById(id);
  if (!exists) return res.status(404).json({ error: "User not found" });

  // checking if the id of the user requesting is the same as the id in db || admin can edit all
  if (req.user != exists._id && req.user != "6337278a070b9b637a5f4cea") {
    return res.status(404).json({ error: "You can't change that password" });
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.findByIdAndUpdate(id, { password: hashedPassword })
    .then(res.json({ response: "Edited" }))
    .catch((error) => res.json({ error }));
};

module.exports = {
  registerUser,
  loginUser,
  editPassword,
};
