const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  price: Number,
  enrollmentCount: { type: Number, default: 0 }
});
module.exports = mongoose.model('Course', courseSchema);