const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const upload = require('../middleware/upload');

// GET all courses
router.get('/', courseController.getAllCourses);

// POST create a new course (with image)
router.post('/create', upload.single('image'), courseController.createCourse);

// PUT update a course
router.put('/edit/:id', upload.single('image'), courseController.editCourse);

router.get('/:title',courseController.getCourseByTitle);

router.delete("/delete/:id", courseController.deleteCourse);

module.exports = router;
