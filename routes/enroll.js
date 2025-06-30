const express = require("express");
const router = express.Router();
const { enrollStudent, getEnrolledStudents,getEnrolledStudentsByCourse } = require("../controllers/enrollController");

router.post("/enroll", enrollStudent); 
router.get("/enrolledstudents",getEnrolledStudents);
router.get("/:courseId/students", getEnrolledStudentsByCourse);

module.exports = router;
