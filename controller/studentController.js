import Assign from "../model/assignModel";


// get assignment
  exports.getAssignment = async (req, res, next) => {
    try {
      const assignment = await Assign.findById(req.params.id)
      .populate('assignmentId', 'assignment');
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      return res.json({ data: assignment });
    } catch (error) {
      next(error);
    }
  };

  
// get assignmet video
  exports.getAssignmentVideo = async (req, res, next) => {
    try {
      const assignment = await Assign.findById(req.params.id)
      .populate('assignmentId', 'video');
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      return res.json({ data: assignment });
    } catch (error) {
      next(error);
    }
  };


  // get assignmet all details
  exports.getAssignmentDetails = async (req, res, next) => {
    try {
      const assignment = await Assign.findById(req.params.id)
      .populate('assignmentId', 'syllabus title description course');
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      return res.json({ data: assignment });
    } catch (error) {
      next(error);
    }
  };

  
  