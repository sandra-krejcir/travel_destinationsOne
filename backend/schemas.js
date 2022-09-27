const mongoose = require("mongoose");
let destinationSchema = new mongoose.Schema({
  title: String,
  dateFrom: Date,
  dateTo: Date,
  description: String,
  location: String,
  country: String,
  url: String,
});

module.exports = mongoose.model("Destination", destinationSchema);
