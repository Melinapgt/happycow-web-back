const express = require("express");
const router = express.Router();
const axios = require("axios");

// envoi de la placeId
router.get("/restaurant"),
  async (req, res) => {
    try {
      //FindbyId et retrouver longitude latitude du restaurant
      // faire une requête axios google
      //renvoyer le resultat
    } catch (error) {
      console.log("error.response ==>", error.response);
      res.status(400).json({ error: "Bad request" });
    }
  };

module.exports = router;
