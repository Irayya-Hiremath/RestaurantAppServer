const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const router = express.Router();

// Register a new user
module.exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id, role: user.role },
    };
    user = user.toObject();
    delete user.password;
    jwt.sign(payload, process.env.SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token:token,status:200,success:true });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login a user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password" ,success:false});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password",success:false });
    }

    const payload = {
      user: { id: user.id, role: user.role },
    };
    user = user.toObject();
    delete user.password;
    jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ user:user,token:token,status:200, });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
