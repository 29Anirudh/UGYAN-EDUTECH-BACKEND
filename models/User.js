const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
<<<<<<< HEAD
  dob: String,
  qualification: String,
  branch: String,
  passOutYear: String,
  collegeName: String,
  mobileNumber: String,
  profilePic: String,
=======
>>>>>>> 5ff118f9624cd7df3c07f602824122817abdbb0f
  enrolledCourses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      enrollId: String,
      paymentStatus: String
    }
  ]
});
module.exports = mongoose.model('User', userSchema);