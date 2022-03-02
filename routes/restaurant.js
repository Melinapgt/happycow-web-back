const express = require("express");
const router = express.Router();
const axios = require("axios");

//Import model
const Restaurant = require("../models/Restaurant");

const GOOGLE_API_KEY = process.env.MY_GOOGLE_API_KEY;

router.get("/restaurant", async (req, res) => {
  try {
    console.log("req.query==>", req.query);
    const { placeId } = req.query;
    // console.log(placeId);

    const restaurant = await Restaurant.findOne({ placeId: placeId });

    res.status(200).json(restaurant);
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
