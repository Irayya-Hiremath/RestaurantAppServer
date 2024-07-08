const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const router = express.Router();

// Register a new user
router.post("/register", createUser);
// Login a user
router.post("/login", loginUser);

module.exports = router;
