import express from "express";
import teacherControllers from "../controller/teacherController";
const router = express.Router();
import authMiddleware from "../middleware/verifyToken";


// post assignment
router.post("/video/upload", authMiddleware, teacherControllers.uploadVideo);

// assign assignment route
router.post("/assign", authMiddleware, teacherControllers.assignToUser);

//  get all user
router.get("/all-assignment", authMiddleware, teacherControllers.allAssignment);

//  get user by id
router.get("/get-assignment/:id", authMiddleware, teacherControllers.getAssignmentById);

//  delete user by id
router.delete("/deleteAssignment/:id", authMiddleware, teacherControllers.deleteAssignment);



export default router;
