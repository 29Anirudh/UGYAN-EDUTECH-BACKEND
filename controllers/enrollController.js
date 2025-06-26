const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

exports.enroll = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.userId;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const enrollId = `ENR-${Math.floor(1000 + Math.random() * 9000)}`;
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      enrollId,
      paymentStatus: 'pending',
      paymentId: ''
    });

    await User.findByIdAndUpdate(userId, {
      $push: { enrolledCourses: { courseId, enrollId, paymentStatus: 'pending' } }
    });

    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.status(201).json({ message: 'Enrolled', enrollId });
  } catch {
    res.status(500).json({ error: 'Enrollment failed' });
  }
};
