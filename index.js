const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

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

const reviewPublishRoutes = require("./routes/reviewPublish");
app.use(reviewPublishRoutes);

const reviewsRoutes = require("./routes/reviews");
app.use(reviewsRoutes);

const reviewsRestaurantRoutes = require("./routes/reviewsPlaceId");
app.use(reviewsRestaurantRoutes);

const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

const getUserAccountRoutes = require("./routes/getUserAccount");
app.use(getUserAccountRoutes);

const getFavoritesRoutes = require("./routes/getFavorites");
app.use(getFavoritesRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
