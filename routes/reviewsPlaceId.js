const express = require("express");
const router = express.Router();

// import

const Review = require("../models/Review");

router.get("/reviews/restaurant", async (req, res) => {
  try {
    console.log("req.query reviews placeId==>", req.query);
    const { placeId } = req.query;

    const restaurantReviews = await Review.find({ placeId });
    // console.log(restaurantReviews);
    // console.log("restaurantReviews.length==>", restaurantReviews.length);

    if (restaurantReviews.length > 0) {
      res.status(200).json(restaurantReviews);
    } else {
      res.status(204).json({
        message: "No review for now, write a review",
      });
    }
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
