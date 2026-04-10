const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Equipment = require("../models/Equipment");
const Rental = require("../models/Rental");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET all users
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// DELETE user
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// GET all equipment
router.get("/equipment", protect, adminOnly, async (req, res) => {
  const equipment = await Equipment.find().populate("owner", "name");
  res.json(equipment);
});

// GET all rentals
router.get("/rentals", protect, adminOnly, async (req, res) => {
  const rentals = await Rental.find()
    .populate("equipment", "title")
    .populate("farmer", "name");
  res.json(rentals);
});

// GET stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  const users = await User.countDocuments();
  const equipment = await Equipment.countDocuments();
  const rentals = await Rental.countDocuments();
  res.json({ users, equipment, rentals });
});

module.exports = router;
