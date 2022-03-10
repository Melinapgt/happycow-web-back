const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/", async (req, res) => {
  try {
    console.log("req.query homepage==>", req.query);

    const limit = 20;
    const bestRestaurantLimit = 10;

    //top Ten

    const ratingRestaurants = await Restaurant.find()
      .limit(bestRestaurantLimit)
      .sort({ rating: "desc" });
    // console.log(ratingRestaurants);

    //filtre - recherche
    let filter = req.query.search;

    if (filter) {
      console.log("filter homepage==>", filter);
      const restaurants = await Restaurant.find({
        name: new RegExp(filter, "i"),
      }).limit(limit);

      res.status(200).json({ ratingRestaurants, restaurants });
    } else {
      const restaurants = await Restaurant.find().limit(limit);

      res.status(200).json({ ratingRestaurants, restaurants });
    }

    // console.log(restaurants);
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
