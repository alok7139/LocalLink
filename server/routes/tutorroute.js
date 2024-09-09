import express from 'express'
import { isauthorized } from "../middlewares/auth.js";
import { deleteusertutor, fetchservice, getalltutor, getallusertutor, registertutor, updatetutor } from '../Controller/tutorcontroller.js';

const router = express.Router();

router.post("/post/tutor/service" , isauthorized , registertutor);
router.get("/get/alluser/tutor" , isauthorized , getallusertutor);
router.get("/get/all/tutor" , getalltutor);
router.delete("/get/delete/:id" , isauthorized , deleteusertutor);
router.put("/get/update/:id" , isauthorized , updatetutor);
router.get("/get/info/:id" , isauthorized , fetchservice);

export default router;