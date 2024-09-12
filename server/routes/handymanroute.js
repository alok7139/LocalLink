import { isauthorized  } from "../middlewares/auth.js";
import express from 'express'
import { allhandymanservice, deleteservice, registerservice, userservice } from "../Controller/handymancontroller.js";

const router = express.Router();

router.post("/post/handyman/service" , isauthorized, registerservice);
router.get("/get/alluser/service" , isauthorized , userservice )
router.get("/get/all/service" , allhandymanservice);
router.delete("/delete/handyman/:id" , isauthorized , deleteservice);


export default router;