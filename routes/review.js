const express = require("express");
const router = express.Router();

// import
const User = require("../models/User");
const Review = require("../models/Review");

router.post("/review", async (req, res) => {
  try {
    console.log(req.fields);
    const { rating, reviewTitle, review, username, placeIdReview } = req.fields;

    //Recherche du userId dans la BDD avec le username
    const user = await User.findOne({ username });
    // console.log(user);
    const userId = user.id;
    console.log(userId);

    const newReview = new Review({
      rating,
      reviewTitle,
      review,
      userId,
      placeId: placeIdReview,
    });

    await newReview.save();
    console.log(newReview);

    res
      .status(200)
      .json({ message: "Your review has been successfully registered" });
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
