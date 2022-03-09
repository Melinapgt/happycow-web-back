const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  name: String,
  placeId: Number,
  userId: String,
  thumbnail: String,
  rating: Number,
});

module.exports = Favorite;
