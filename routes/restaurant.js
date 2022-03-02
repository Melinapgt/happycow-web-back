const express = require("express");
const router = express.Router();
const axios = require("axios");

//Import model
const Restaurant = require("../models/Restaurant");

const GOOGLE_API_KEY = process.env.MY_GOOGLE_API_KEY;

router.get("/restaurant", async (req, res) => {
  try {
    console.log(req.query);
    const { placeId } = req.query;
    // console.log(placeId);

    const restaurant = await Restaurant.findOne({ placeId: placeId });

    //googlemap--------------

    const latitude = restaurant.location.lat;
    const longitude = restaurant.location.lng;
    console.log(latitude, longitude);
    //ajout de la map
    const initMap = () => {
      //localisation du restaurant
      const restaurantLocation = { lat: latitude, lng: longitude };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: restaurantLocation,
      });
      //Marker
      const marker = new google.maps.Marker({
        position: restaurantLocation,
        map: map,
      });
    };

    const map = async () => {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=${initMap}&libraries=&v=weekly`
      );
    };

    const getMap = map();
    res.status(200).json({ restaurant: restaurant, map: getMap });
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
