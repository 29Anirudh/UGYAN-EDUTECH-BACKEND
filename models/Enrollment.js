const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  enrollmentId: {
    type: String,
    unique: true,
  },
  status:{
    type:String,
    enum:['Active','Pending'],
    default:'Pending'
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
