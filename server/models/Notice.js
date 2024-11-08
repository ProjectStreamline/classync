const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  batch: { type: String, required: true },
  branch: { type: String, required: true },
  studentIds: [{ type: String, required: true }],
  notice: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notice", noticeSchema);
