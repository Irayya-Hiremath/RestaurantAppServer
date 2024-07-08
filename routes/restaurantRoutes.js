const {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  deleteRestaurant,
  getSingleRestaurant
} = require("../controller/restaurantController");
const express = require("express");
const { authentication, roleVerification } = require("../middleware/auth");
const router = express.Router();

// Add a new restaurant
router.post(
  "/restaurant/new",
  authentication,
  roleVerification,
  createRestaurant
);

router.post(
  "/restaurant/update/:id",
  authentication,
  roleVerification,
  updateRestaurant
);

router.get("/restaurant", getAllRestaurants);

router.delete(
  "/restaurant/delete/:id",
  authentication,
  roleVerification,
  deleteRestaurant
);
 
router.get("/restaurants", getAllRestaurants);

router.get(
  "/restaurant/:id",
  authentication,
  getSingleRestaurant
);

module.exports = router;
