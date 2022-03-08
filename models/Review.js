const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  rating: Number,
  reviewTitle: String,
  review: String,
  placeId: String,
  userId: String,
});

module.exports = Review;
