const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

//import
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.fields);
    //Vérification avant création d'un compte
    const { email, username, password } = req.fields;

    const searchForEmail = await User.findOne({ email });
    console.log(searchForEmail);
    if (searchForEmail !== null) {
      console.log(searchForEmail);
      res
        .status(409)
        .json({ message: "Account already existing with this email" });
    } else {
      // création du compte
      const salt = uid2(64);
      console.log("salt==>", salt);
      const hash = SHA256(password + salt).toString(encBase64);
      console.log("hash==>", hash);
      const token = uid2(20);
      console.log("token==>", token);

      const newUser = new User({ email, username, salt, hash, token });

      await newUser.save();

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        token: newUser.token,
        message: "Your account has been successfully created!",
      });
    }
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
