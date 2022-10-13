const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
