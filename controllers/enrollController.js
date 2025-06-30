const Enrollment = require("../models/Enrollment");
const { v4: uuidv4 } = require("uuid");

const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  console.log(req.body);
  try {
    // Check for duplicate
    const alreadyEnrolled = await Enrollment.findOne({ student: studentId, course: courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled." });
    }

    const newEnrollment = new Enrollment({
      student: studentId,
      course: courseId,
      enrollmentId: uuidv4(),
    });

    await newEnrollment.save();
    res.status(201).json({ message: "Enrollment successful", enrollment: newEnrollment });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed", error: err.message });
  }
};

const getEnrolledStudents = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "firstName lastName email mobileNumber")
      .populate("course", "title");

    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrolled students", error: err.message });
  }
};


const getEnrolledStudentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrolled = await Enrollment.find({ course: courseId })
      .populate("student", "firstName lastName email mobileNumber") // populate student fields
      .populate("course", "title"); // ✅ populate course title
    res.status(200).json(enrolled);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrolled students", error: err.message });
  }
};

module.exports = { enrollStudent, getEnrolledStudents,getEnrolledStudentsByCourse };
