const express = require("express");
const router = express.Router();

//Import model
const Restaurant = require("../models/Restaurant");

router.get("/restaurants/all", async (req, res) => {
  try {
    console.log("req.query allRestaurant==>", req.query);

    //filtre - recherche
    let filter = req.query.search;

    //pagination
    let page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 20;
    const skip = (page - 1) * limit;
    // const restaurants = await Restaurant.find().limit(limit).skip(skip);

    if (filter) {
      console.log("allRestaurant filter ==>", filter);
      const restaurants = await Restaurant.find({
        name: new RegExp(filter, "i"),
      })
        .limit(limit)
        .skip(skip);
      console.log("restaurants filtered==>", restaurants);
      res.status(200).json(restaurants);
    } else {
      const restaurants = await Restaurant.find().limit(limit).skip(skip);
      res.status(200).json(restaurants);
    }
  } catch (error) {
    console.log("error.response ==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
