import mongoose from "mongoose";

// Define a reference to the Auth model
const Auth = mongoose.model('Auth', new mongoose.Schema({}));

let assignToSchema = new mongoose.Schema({
  assignToStudent: [{type: mongoose.Types.ObjectId , ref: 'Auth'}],
  teacherId: {type: mongoose.Types.ObjectId , ref: 'Auth'},
  assignmentId: [{type: mongoose.Types.ObjectId , ref: 'Assignment'}],
  dueDate: { type: String, required: true },
  status: {
    type: String,
    enum: ["assigned"]
  },
});


const Assign = mongoose.model("Assign", assignToSchema);
module.exports = Assign;
