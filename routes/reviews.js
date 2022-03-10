const express = require("express");
const router = express.Router();

// import
const User = require("../models/User");
const Review = require("../models/Review");

//Read
router.get("/reviews", async (req, res) => {
  try {
    // console.log("req.fields reveiws ==>", req.fields);

    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
