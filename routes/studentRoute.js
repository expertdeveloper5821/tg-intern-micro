import express from 'express'
import UserControllers from "../controller/studentController";
const router = express.Router();
import authMiddleware from '../middleware/verifyToken';


// get assignment by assignmetId
router.get('/assignments/:id', authMiddleware,UserControllers.getAssignment);

// get assignment video only
router.get('/assignmentsvideo/:id', authMiddleware,UserControllers.getAssignmentVideo);

// get assignment all details only
router.get('/assignmentdetails/:id', authMiddleware,UserControllers.getAssignmentDetails);



export default router;