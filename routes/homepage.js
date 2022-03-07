const express = require("express");
const router = express.Router();
const axios = require("axios");

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/", async (req, res) => {
  try {
    console.log(req.query);

    const limit = 100;
    const bestRestaurantLimit = 10;

    const restaurants = await Restaurant.find().limit(limit);
    // console.log(restaurants);

    //top Ten

    const ratingRestaurants = await Restaurant.find()
      .limit(bestRestaurantLimit)
      .sort({ rating: "desc" });
    // console.log(ratingRestaurants);

    res.status(200).json({ ratingRestaurants, restaurants });
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
