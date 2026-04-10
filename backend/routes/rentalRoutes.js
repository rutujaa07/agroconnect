const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");
const Equipment = require("../models/Equipment");
const { protect } = require("../middleware/authMiddleware");

// POST book equipment
router.post("/", protect, async (req, res) => {
  try {
    const { equipmentId, startDate, endDate } = req.body;
    const equip = await Equipment.findById(equipmentId);
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const rental = await Rental.create({
      equipment: equipmentId,
      farmer: req.user._id,
      startDate,
      endDate,
      totalDays: days,
      totalCost: days * equip.pricePerDay,
    });
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my rentals
router.get("/my", protect, async (req, res) => {
  try {
    const rentals = await Rental.find({ farmer: req.user._id }).populate(
      "equipment",
      "title pricePerDay imageUrl"
    );
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET owner's equipment rentals
router.get("/owner", protect, async (req, res) => {
  try {
    const myEquipment = await Equipment.find({ owner: req.user._id });
    const ids = myEquipment.map((e) => e._id);
    const rentals = await Rental.find({ equipment: { $in: ids } })
      .populate("equipment", "title")
      .populate("farmer", "name phone");
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update rental status
router.put("/:id/status", protect, async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(rental);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
