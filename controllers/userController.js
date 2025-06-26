const User = require('../models/User');
exports.editProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    qualification,
    branch,
    passOutYear,
    collegeName,
    mobileNumber,
    profilePic
  } = req.body;
  try {
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (dob !== undefined) updateFields.dob = dob;
    if (qualification !== undefined) updateFields.qualification = qualification;
    if (branch !== undefined) updateFields.branch = branch;
    if (passOutYear !== undefined) updateFields.passOutYear = passOutYear;
    if (collegeName !== undefined) updateFields.collegeName = collegeName;
    if (mobileNumber !== undefined) updateFields.mobileNumber = mobileNumber;
    if (profilePic !== undefined) updateFields.profilePic = profilePic;

    const updated = await User.findByIdAndUpdate(req.user.userId, updateFields, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed' });
  }
};

// 📄 controllers/courseController.js
const Course = require('../models/Course');
exports.getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};
exports.createCourse = async (req, res) => {
  const { title, description, instructor, price } = req.body;
  const course = await Course.create({ title, description, instructor, price });
  res.status(201).json(course);
};