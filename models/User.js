const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  dob: String,
  qualification: String,
  branch: String,
  passOutYear: String,
  collegeName: String,
  mobileNumber: String,
  profilePic: String,
  enrolledCourses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      enrollId: String,
      paymentStatus: String
    }
  ]
});
module.exports = mongoose.model('User', userSchema);