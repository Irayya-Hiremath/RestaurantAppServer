const Restaurant = require("../models/restaurantModel");

// Add a new restaurant
module.exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const restaurant = await newRestaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Restaurants details
module.exports.getSingleRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(500).json({
        success: false,
        message: "restaurant not found",
      });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "restaurant not found",
    });
  }
};

// Modify a restaurant
module.exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "restaurant not found",
    });
  }
};

// Delete a restaurant
module.exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ msg: "Restaurant deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "restaurant not found",
    });
  }
};

// List restaurants
module.exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.getSingleRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(500).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
};