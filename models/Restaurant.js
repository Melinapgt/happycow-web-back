const mongoose = require("mongoose");

const Restaurant = mongoose.model("Restaurant", {
  placeId: Number,
  name: String,
  address: String,
  location: Object,
  phone: String,
  thumbnail: String,
  type: String,
  category: Number,
  rating: Number,
  vegan: Number,
  vegOnly: Number,
  link: String,
  description: String,
  picture: Array,
  price: String,
  website: String,
  facebook: String,
  nearByPlacesIds: Array,
});

module.exports = Restaurant;
