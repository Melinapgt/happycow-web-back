const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  salt: String,
  hash: String,
  token: String,
  favorites: Array,
});

module.exports = User;
