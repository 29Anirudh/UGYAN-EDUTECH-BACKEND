const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  dob: String,
  qualification: String,
  branch: String,
  passOutYear: String,
  collegeName: String,
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