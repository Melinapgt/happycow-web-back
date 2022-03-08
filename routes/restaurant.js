const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/restaurant", async (req, res) => {
  try {
    console.log("req.query==>", req.query);
    const { placeId } = req.query;
    // console.log(placeId);
    // console.log(req.query.placeId);

    const restaurant = await Restaurant.findOne({ placeId: Number(placeId) });
    // console.log(Object.keys(restaurant._doc));

    // console.log(
    //   "restaurant.nearbyPlacesIds==>",
    //   restaurant._doc.nearbyPlacesIds
    // );
    // requête nearby
    const nearbyRestaurants = [];

    for (const placeId of restaurant._doc.nearbyPlacesIds) {
      // console.log("nearby placeId", placeId);
      const nearby = await Restaurant.findOne({ placeId });
      // console.log(nearby);
      nearbyRestaurants.push(nearby);
    }

    // console.log(nearbyRestaurants);

    res
      .status(200)
      .json({ restaurant: restaurant, nearbyRestaurants: nearbyRestaurants });
  } catch (error) {
    console.log("error.response ==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
