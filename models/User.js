const {Schema,model} = require('mongoose');
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role:{
    type:String,
    enum:["Student","Admin"],
    default:"Student"
  },
  enrolledCourses: [
    {
      courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
      enrollId: String,
      paymentStatus: String
    }
  ],
  branch:{
    type: String
  },
  collegeName:{
    type:String
  },
  mobileNumber:{
    type:Number,
    required:true,
  },
  passOutYear:{
    type:Number
  },
  Qualification:{
    type:String
  }
});
module.exports = model('User', userSchema);