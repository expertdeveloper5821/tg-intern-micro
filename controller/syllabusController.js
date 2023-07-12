const Syllabus = require("../model/syllabusModel");
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "dhfmfcjt7",
  api_key: "547384683964197",
  api_secret: "Vi7QLe4aBrfCM4dVHgSX6QtlO3k",
});

export const syllabusUpload = async (req, res) => {
  try {
    const { teacherId, course } = req.body;
    const { path: tempPath, filename } = req.file;
    if (!filename || !teacherId || !course) {
      res.status(400).json({ message: "All fields are required" });
    } else {
      // Upload the pdf to Cloudinary
      const { secure_url } = await cloudinary.uploader.upload(tempPath, {
        folder: "uploads",
      });

      // Delete the file from the folder
      fs.unlink(tempPath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
      // create the syllabus
      const newSyllabus = new Syllabus({
        pdfFile: secure_url,
        teacherId,
        course,
      });
      // save the syllabus
      const syllabussave = await newSyllabus.save();
      if (syllabussave?._id) {
        return res.status(200).json({
          message: "File uploaded successfully",
          code: 200,
          pdfFile: secure_url,
          teacherId,
          course,
        });
      } else {
        res.status(400).json({ error: error });
      }
    }
  } catch (error) {
    console.error("Error saving file:", err);
    res.status(500).json({ code: 500, message: "Error saving file" });
  }
};

//  to delete the doc in DB
export const deleteDocument = async (req, res) => {
  const id = req.params.id;
  try {
    // delete the Document if found
    await Syllabus.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: 200, message: "Document deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, error: `Documnent with id ${id} not found` });
  }
};
