const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  rating: Number,
  reviewTitle: String,
  review: String,
  placeId: Number,
  name: String,
  userId: String,
  username: String,
});

module.exports = Review;
