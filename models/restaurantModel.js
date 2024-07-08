const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema(
  {
    dish_name: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
  },
  { _id: true }
);

const RestaurantSchema = new Schema({
  hotel_name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: String, default: 0 },
  menu: [DishSchema],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
