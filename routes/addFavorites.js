const express = require("express");
const router = express.Router();

// import
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Favorite = require("../models/Favorite");

router.post("/add/favorites", async (req, res) => {
  try {
    console.log("req add favorites==>", req.fields);

    const { name, placeId, thumbnail, rating, username } = req.fields;
    const searchForUser = await User.findOne({ username });
    const userId = searchForUser.id;
    console.log(userId);

    //On vérifie si le restaurant a déjà été aujouté en BDD

    const searchForFavorite = await Favorite.findOne({ placeId, userId });
    console.log("searchForFavorite==>", searchForFavorite);

    if (searchForFavorite) {
      await Favorite.findOneAndDelete({
        placeId,
        userId,
      });
      res.status(200).json({ message: "Successfully removed !" });
    } else {
      const newFavorite = new Favorite({
        name,
        placeId,
        thumbnail,
        rating,
        userId,
      });

      await newFavorite.save();

      res.status(200).json({ message: "Successfully added to favorites !" });
    }
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
