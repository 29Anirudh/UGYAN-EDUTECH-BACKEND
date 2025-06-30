const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  lessons: {
    type: [String],
    required: true
  },
  extras: {
    type: [String],
    default: []
  },
  duration: {
    type: String,
    required: true
  },
  careers: {
    roles: {
      type: [String],
      default: []
    },
    package: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
