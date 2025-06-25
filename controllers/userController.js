const User = require('../models/User');
exports.editProfile = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(req.user.userId, { firstName, lastName }, { new: true });
    res.json(updated);
  } catch {
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