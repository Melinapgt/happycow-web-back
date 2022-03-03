const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/restaurant", async (req, res) => {
  try {
    console.log("req.query==>", req.query);
    const { placeId } = req.query;
    // console.log(placeId);

    const restaurant = await Restaurant.findOne({ placeId: placeId });

    // requête nearby

    res.status(200).json(restaurant);
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
