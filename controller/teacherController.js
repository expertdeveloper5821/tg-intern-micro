import fs from "fs";
import multer from "multer";
import Assignment from "../model/teacherModel";
import Assign from "../model/assignModel";
import { v2 as cloudinary } from "cloudinary";

exports.uploadVideo = async (req, res) => {
    // Get the file name and extension with multer
    const storage = multer.diskStorage({
      filename: (req, file, cb) => {
        const fileExt = file.originalname.split(".").pop();
        const filename = `${new Date().getTime()}.${fileExt}`;
        cb(null, filename);
      },
    });
  
    // Filter the file to validate if it meets the required video extension
    const fileFilter = (req, file, cb) => {
      if (file.mimetype === "video/mp4") {
        cb(null, true);
      } else {
        cb(
          {
            message: "Unsupported File Format",
          },
          false
        );
      }
    };
  
    // Set the storage, file filter and file size with multer
    const upload = multer({
      storage,
      limits: {
        fieldNameSize: 200,
        fileSize: 30 * 1024 * 1024,
      },
      fileFilter,
    }).single("video");
  
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      // SEND FILE TO CLOUDINARY
      cloudinary.config({
        cloud_name: "dhfmfcjt7",
        api_key: "547384683964197",
        api_secret: "Vi7QLe4aBrfCM4dVHgSX6QtlO3k"
      });
      const { path } = req.file; // file becomes available in req at this point
  
      const fName = req.file.originalname.split(".")[0];
      const uploadOptions = {
        resource_type: "video",
        public_id: `VideoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            audio_codec: "none",
          },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ],
      };
  
      try {
        // Upload video to Cloudinary
        const video = await cloudinary.uploader.upload(path, uploadOptions);
        // Delete local video file
        fs.unlinkSync(path);
  
        // Save assignment to database
        const { teacherId, syllabus, title, description, course, assignment } = req.body;
        const teacher = new Assignment({
          teacherId,
          syllabus,
          video: video.url,
          title,
          description,
          course,
          assignment,
        });
        await teacher.save();
  
        return res.status(200).json({ message: "Assignment saved successfully"});
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    });
  };


  // post api to assign a assignment
  exports.assignToUser = async (req, res, next) => {
    try {
      const {
        teacherId,
        assignToStudent,
        assignmentId,
        dueDate,
        status
      } = req.body;
      if (
        !teacherId ||
        !assignToStudent ||
        !Array.isArray(assignToStudent) ||
        assignToStudent.length === 0 ||
        !assignmentId ||
        !Array.isArray(assignmentId) ||
        assignmentId.length === 0 ||
        !dueDate ||
        !status
      ) {
        res.status(400).json({
          error: { message: `All fields are required.` },
        });
      } else {
        // create the new assignment
        const doc = new Assign({
          teacherId,
          assignToStudent,
          assignmentId,
          dueDate,
          status
        });
        // save the assignment
        const assignmentsave = await doc.save();
        if (assignmentsave._id) {
          return res.status(200).json({
            message: "Successfully Assign",
          });
        } else {
          res.status(200).json({ message: "Not Assigned" });
        }
      }
    } catch (error) {
      next(error);
    }
  };
  


  // Get Assignment by id
  exports.getAssignmentById = async (req, res, next) => {
  try {
    let data = await Assign.findOne({ _id: req.params.id })
    .populate("assignToStudent", "name email");
    return res.json({ data });
  } catch (error) {
    next(error);
  }
};

// Get all Assignment
exports.allAssignment = async (req, res, next) => {
  try {
    let users = await Assignment.find({});
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
};

// Delete Assignment by id
exports.deleteAssignment = async (req, res, next) => {
  try {
    const deleteUser = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res
        .status(400)
        .json({ error: { message: "Post is not deleted" } });
    }
    return res.status(200).json({ message: "Post is deleted" });
  } catch (error) {
    next(error);
  }
};


