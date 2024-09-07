import express from "express";
import { bookgarden, deleteservice, getallgarden, getallusergarden, registergarden } from "../Controller/gardeningcontroller.js";
import { isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post/garden/service" , isauthorized , registergarden);
router.get("/get/all/garden" , getallgarden);
router.get("/get/user/garden" , isauthorized , getallusergarden);
router.delete('/delete/:id' , isauthorized , deleteservice);
router.post('/book/garden/service/:id' , isauthorized , bookgarden)

export default router;