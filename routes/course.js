const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse } = require('../controllers/courseController');
router.get('/', getAllCourses);
router.post('/', createCourse);
module.exports = router;