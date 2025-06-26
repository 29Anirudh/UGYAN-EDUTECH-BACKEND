const mongoose = require('mongoose');
const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollId: String,
  paymentStatus: String,
  paymentId: String
});
module.exports = mongoose.model('Enrollment', enrollmentSchema);