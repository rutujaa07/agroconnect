const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["tractor", "harvester", "irrigation", "plough", "sprayer", "other"],
    required: true,
  },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  available: { type: Boolean, default: true },
  imageUrl: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
