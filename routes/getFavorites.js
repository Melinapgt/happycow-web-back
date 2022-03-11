const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/favorites/restaurants", async (req, res) => {
  try {
    console.log(req.query);
    const { favorites } = req.query;

    const favoritesRestaurants = [];
    for (const restaurantId of favorites) {
      const restaurant = await Restaurant.findById(restaurantId);
      // console.log(nearby);
      favoritesRestaurants.push(restaurant);
    }

    res.status(200).json(favoritesRestaurants);
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
