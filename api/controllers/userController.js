const validateEmail = require("../util/validateEmail");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // one of the fields is not filled
  if (!(name && email && password)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // checking is email is valid
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // checking if email is in db already
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: "Email is already registered" });
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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
  const { email, password } = req.body;

  // one of the fields is not filled
  if (!(email && password)) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  // checking is email is valid
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // checking if email is in db already
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "This email is not registered" });
  }

  // checking the password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).json({ error: "Wrong password" });
  }

  // logged & token
  const token = jwt.sign({ _id: user._id }, process.env.TOKENSECRET);
  res.header("auth-token", token).json({
    response: "Logged in",
    "auth-token": token,
    name: user.name,
    id: user._id,
  });
};

const editPassword = async (req, res) => {
  const { id } = req.params;
  const { password, oldPassword } = req.body;

  // front end has a default user, not allowed to reset password
  if (id == "6341a53085844835f43a3cff") {
    return res
      .status(400)
      .json({ error: "You can't change the password of this user" });
  }

  if (!(password && oldPassword)) {
    return res.status(400).json({ error: "You need to fill all the fields" });
  }

  // checking if the id is a valid one
  if (!ObjectId.isValid(id))
    return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await User.findById(id);
  if (!exists) return res.status(404).json({ error: "User not found" });

  // checking if the id of the user requesting is the same as the id in db || admin can edit all
  if (req.user.id != exists._id && req.user.id != "6337278a070b9b637a5f4cea") {
    return res.status(404).json({ error: "You can't change that password" });
  }

  const validPass = await bcrypt.compare(oldPassword, exists.password);
  if (!validPass) {
    return res.status(400).json({ error: "Wrong current password" });
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  User.findByIdAndUpdate(id, { password: hashedPassword })
    .then(res.json({ response: "Edited" }))
    .catch((error) => res.json({ error }));
};

module.exports = {
  registerUser,
  loginUser,
  editPassword,
};
