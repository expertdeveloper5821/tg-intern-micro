const mongoose = require('mongoose');

// Schema for the uploaded files
 export const syllabusSchema = new mongoose.Schema({
  teacherId: {type: mongoose.Types.ObjectId , ref: 'Auth'},
  pdfFile: {type: String},
  course: { type: String, required: true },
});

// Model for the uploaded files
module.exports = mongoose.model('Syllabus', syllabusSchema);