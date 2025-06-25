const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  enrolledCourses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      enrollId: String,
      paymentStatus: String
    }
  ]
});
module.exports = mongoose.model('User', userSchema);