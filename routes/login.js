const express = require("express");
const router = express.Router();
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    console.log(req.fields);

    const { email, password } = req.fields;

    //On vérifie si l'email existe

    const searchForAccount = await User.findOne({ email });

    if (searchForAccount === null) {
      res.status(401).json({
        error: "Unhautorized1",
        message: "Email or Password is incorrect",
      });
    } else {
      const newHash = SHA256(password + searchForAccount.salt).toString(
        encBase64
      );

      if (searchForAccount.hash === newHash) {
        res.status(200).json({
          id: searchForAccount.id,
          username: searchForAccount.username,
          token: searchForAccount.token,
        });
      } else {
        res.status(401).json({
          error: "Unhautorized2",
          message: "Email or Password is incorrect",
        });
      }
    }
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
