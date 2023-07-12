import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/verifyToken";
import { syllabusUpload, deleteDocument } from "../controller/syllabusController";
const route = express.Router();
import multer from 'multer';
import path from "path";
import bodyParser from "body-parser";
router.use(bodyParser.json())
router.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
router.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../uploads/uploads'),function(error,success){
            if(error) throw error
        });
    },
    filename:function(req, file, cb){
        const name = Date.now()+'_'+file.originalname;
        cb(null, name, function(error, success){
            if(error) throw error
        })
    }
})

const upload = multer({storage: storage});

// syllabus post api
route.post("/syllabus-upload", upload.single('pdfFile'), authMiddleware, syllabusUpload);

// delete api 
route.delete("/syllabus-delete/:id", authMiddleware, deleteDocument);
export default route;