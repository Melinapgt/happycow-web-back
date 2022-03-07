const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/restaurants/all", async (req, res) => {
  try {
    console.log(req.query);

    //pagination
    const limit = 20;
    const restaurants = await Restaurant.find().limit(limit);

    res.status(200).json(restaurants);
  } catch (error) {
    console.log("error.response ==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
