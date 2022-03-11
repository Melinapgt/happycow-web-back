const express = require("express");
const router = express.Router();

// import
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

router.get("/my-account", async (req, res) => {
  try {
    console.log(req.query);
    const { username } = req.query;
    console.log(username);

    const userAccount = await User.findOne({ username });
    console.log("userAccount", userAccount);

    // Récupération des favoris
    const favoritesArray = userAccount.favorites;
    console.log(favoritesArray);

    const favoritesRestaurants = [];

    for (const restaurantId of favoritesArray) {
      const restaurant = await Restaurant.findById(restaurantId);
      console.log(restaurant);
      favoritesRestaurants.push(restaurant);
    }
    console.log(favoritesRestaurants);

    res.status(200).json({ userAccount, favoritesRestaurants });
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
