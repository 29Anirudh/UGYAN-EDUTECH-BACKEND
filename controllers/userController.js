const User = require('../models/User');
exports.editProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    qualification,
    branch,
    passOutYear,
    collegeName,
    mobileNumber,
    profilePic
  } = req.body;
  try {
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (dob !== undefined) updateFields.dob = dob;
    if (qualification !== undefined) updateFields.qualification = qualification;
    if (branch !== undefined) updateFields.branch = branch;
    if (passOutYear !== undefined) updateFields.passOutYear = passOutYear;
    if (collegeName !== undefined) updateFields.collegeName = collegeName;
    if (mobileNumber !== undefined) updateFields.mobileNumber = mobileNumber;
    if (profilePic !== undefined) updateFields.profilePic = profilePic;

    const updated = await User.findByIdAndUpdate(req.user.userId, updateFields, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed' });
  }
};

exports.getUsers=async (req,res)=>{
  try{
    const users= await User.find();
    res.json(users);
  }
  catch(err){
    res.status(500).json({error:err});
  }
  
}
exports.getAdmins=async(req,res)=>{
  try{
    const admins= await User.find({role:'Admin'});
    res.status(200).json(admins);
  }
  catch(err){
    res.status(500).json({success:false,error:err});
  }
}