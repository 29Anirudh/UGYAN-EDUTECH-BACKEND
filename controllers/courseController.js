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