import mongoose from "mongoose";

// Define a reference to the Auth model
// const Auth = mongoose.model('Auth', new mongoose.Schema({}));

let teacherSchema = new mongoose.Schema({
  studentId: {type: mongoose.Types.ObjectId , ref: 'Auth'},
  teacherId: {type: mongoose.Types.ObjectId , ref: 'Auth'},
  syllabus: { type: String, required: true },
  video: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, required: true },
  assignment: { type: String, required: true }
});

const Teacher = mongoose.model("Assignment", teacherSchema);
module.exports = Teacher;
