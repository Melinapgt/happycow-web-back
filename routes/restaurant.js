const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/restaurant", async (req, res) => {
  try {
    console.log("req.query restaurant==>", req.query);
    const { placeId } = req.query;
    // console.log(placeId);

    const restaurant = await Restaurant.findOne({ placeId: Number(placeId) });
    // console.log(Object.keys(restaurant._doc));

    // console.log(
    //   "restaurant.nearbyPlacesIds==>",
    //   restaurant._doc.nearbyPlacesIds
    // );

    // requête nearby--------------------------------------
    const nearbyRestaurants = [];
    //._doc a été utilisé pour eviter d'avoir un undefined, probablement dû au chargement de la bdd avec le fichier json
    for (const placeId of restaurant._doc.nearbyPlacesIds) {
      // console.log("nearby placeId", placeId);
      const nearby = await Restaurant.findOne({ placeId });
      // console.log(nearby);
      nearbyRestaurants.push(nearby);
    }

    res
      .status(200)
      .json({ restaurant: restaurant, nearbyRestaurants: nearbyRestaurants });
  } catch (error) {
    console.log("error.response ==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
