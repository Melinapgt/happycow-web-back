const express = require("express");
const router = express.Router();

// import
const User = require("../models/User");

router.get("/my-account", async (req, res) => {
  try {
    console.log(req.query);
    const { username } = req.query;
    console.log(username);

    const userAccount = await User.findOne({ username });
    console.log(userAccount);

    res.status(200).json(userAccount);
  } catch (error) {
    console.log("error.message==>", error.message);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
