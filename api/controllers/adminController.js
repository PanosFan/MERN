const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/User");

const adminDeleteUser = async (req, res) => {
  const { id } = req.params;

  // checking if the id is a valid one
  if (!ObjectId.isValid(id))
    return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await User.findById(id);
  if (!exists) return res.status(404).json({ error: "User not found" });

  // delete the user
  User.findByIdAndDelete(id)
    .then(res.json({ response: "Deleted" }))
    .catch((error) => res.json(error));
};

const adminGetUser = (req, res) => {
  User.find()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};

module.exports = {
  adminDeleteUser,
  adminGetUser,
};
