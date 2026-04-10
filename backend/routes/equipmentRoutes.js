const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const { protect } = require("../middleware/authMiddleware");

// GET all equipment (with optional location filter)
router.get("/", async (req, res) => {
  try {
    const { location, category } = req.query;
    let query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (category) query.category = category;
    const equipment = await Equipment.find(query).populate(
      "owner",
      "name email phone"
    );
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single equipment
router.get("/:id", async (req, res) => {
  try {
    const equip = await Equipment.findById(req.params.id).populate(
      "owner",
      "name phone location"
    );
    if (!equip) return res.status(404).json({ message: "Equipment not found" });
    res.json(equip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create equipment (owner only)
router.post("/", protect, async (req, res) => {
  try {
    const equip = await Equipment.create({ ...req.body, owner: req.user._id });
    res.status(201).json(equip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update equipment
router.put("/:id", protect, async (req, res) => {
  try {
    const equip = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(equip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE equipment
router.delete("/:id", protect, async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: "Equipment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
