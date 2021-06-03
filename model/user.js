const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  createDate: { type: Date, default: new Date() },
  email: { type: String, unique: true },
});

module.exports = mongoose.model("user", userSchema);
