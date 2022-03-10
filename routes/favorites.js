const express = require("express");
const router = express.Router();

// import
// const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

router.post("/favorites", async (req, res) => {
  try {
    console.log("req add favorites==>", req.fields);

    const { restaurantId, username } = req.fields;
    const searchForUser = await User.findOne({ username });

    // console.log("searchForUser.favorites==>", searchForUser.favorites);
    // console.log(
    //   "searchForUser.favorites.length==>",
    //   searchForUser.favorites.length
    // );

    if (searchForUser.favorites.length === 0) {
      searchForUser.favorites.push(restaurantId);
      await searchForUser.save();
      res.status(200).json({
        message: "Successfully added to favorites !",
        favorites: searchForUser.favorites,
      });
    } else {
      for (let i = 0; i < searchForUser.favorites.length; i++) {
        // console.log(
        //   `pour i= ${i}, searchForUser.favorites[i]=${searchForUser.favorites[i]}`
        // );
        if (searchForUser.favorites[i] === restaurantId) {
          searchForUser.favorites.splice(i, 1);
          await searchForUser.save();
          res.status(200).json({
            message: "Successfully removed !",
            favorites: searchForUser.favorites,
          });

          break;
        } else {
          searchForUser.favorites.push(restaurantId);
          await searchForUser.save();
          res
            .status(200)
            .json({
              message: "Successfully added to favorites !",
              favorites: searchForUser.favorites,
            });

          break;
        }
      }
    }
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
