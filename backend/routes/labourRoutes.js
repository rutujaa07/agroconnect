const express = require("express");
const router = express.Router();
const Labourer = require("../models/Labourer");
const { protect } = require("../middleware/authMiddleware");

// GET all labourers
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    const labourers = await Labourer.find(query).populate("user", "name phone");
    res.json(labourers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create profile
router.post("/", protect, async (req, res) => {
  try {
    const profile = await Labourer.create({ ...req.body, user: req.user._id });
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update profile
router.put("/:id", protect, async (req, res) => {
  try {
    const profile = await Labourer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
