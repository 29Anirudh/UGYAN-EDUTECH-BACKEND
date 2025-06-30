const Course = require('../models/Course');
const cloudinary = require('../utils/cloudinary');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      lessons,
      extras,
      duration,
      careers
    } = req.body;

    if (!req.file) return res.status(400).json({ error: 'Image is required' });

    const image = req.file.path;

    const course = new Course({
      title,
      subtitle,
      description,
      lessons: JSON.parse(lessons),
      extras: JSON.parse(extras),
      duration,
      image,
      careers: JSON.parse(careers)
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Delete image from Cloudinary
    if (course.image) {
      const publicId = course.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`courses/${publicId}`);
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Failed to delete course" });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const {
      title,
      subtitle,
      description,
      lessons,
      extras,
      duration,
      careers
    } = req.body;

    // If image is updated
    if (req.file) {
      // Remove old image from Cloudinary
      const publicId = course.image?.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`courses/${publicId}`);
      }

      // Update with new image
      course.image = req.file.path;
    }

    // Update text fields
    course.title = title || course.title;
    course.subtitle = subtitle || course.subtitle;
    course.description = description || course.description;
    course.duration = duration || course.duration;

    // Parse JSON arrays safely if needed
    course.lessons = lessons ? JSON.parse(lessons) : course.lessons;
    course.extras = extras ? JSON.parse(extras) : course.extras;
    course.careers = careers ? JSON.parse(careers) : course.careers;

    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong: " + err.message });
  }
};


exports.getCourseByTitle = async (req, res) => {
  try {
    const titleSlug = req.params.title.replace(/-/g, " ").toLowerCase();
    const course = await Course.findOne({
      title: { $regex: new RegExp(`^${titleSlug}$`, "i") },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course." });
  }
};