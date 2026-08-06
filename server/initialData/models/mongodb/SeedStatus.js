const mongoose = require("mongoose");

const seedStatusSchema = new mongoose.Schema({
  _id: { type: String },
  seededAt: { type: Date, default: Date.now },
});

const SeedStatus = mongoose.model("seedStatus", seedStatusSchema);

module.exports = SeedStatus;
