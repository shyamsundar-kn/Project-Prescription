const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  problem: String,
  duration: String,
  remedy: String,
  doctor: {
    name: String,
    specialist: String,
    phone: String
  }
});

module.exports = mongoose.model("Symptom", symptomSchema);
