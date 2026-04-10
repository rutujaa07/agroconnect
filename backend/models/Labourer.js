const mongoose = require("mongoose");

const labourerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [{ type: String }],
  experience: { type: String },
  dailyRate: { type: Number, required: true },
  location: { type: String, required: true },
  available: { type: Boolean, default: true },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Labourer", labourerSchema);
