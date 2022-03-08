const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect("mongodb://localhost/happycow");

//import des routes

const homepageRoutes = require("./routes/homepage");
app.use(homepageRoutes);

const restaurantRoutes = require("./routes/restaurant");
app.use(restaurantRoutes);

const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

const loginRoutes = require("./routes/login");
app.use(loginRoutes);

const allRestaurantsRoutes = require("./routes/allRestaurants");
app.use(allRestaurantsRoutes);

const reviewRoutes = require("./routes/review");
app.use(reviewRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
