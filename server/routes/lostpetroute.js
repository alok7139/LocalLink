import express from "express";
import { deletepetpost, getallpet, getalluserpet, registerpet } from "../Controller/lostpetcontroller.js";
import { isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post/lost/pet" , isauthorized , registerpet);
router.get('/all/user/pet' , isauthorized , getalluserpet)
router.get("/all/pet" , getallpet);
router.delete("/delete/pet/post/:id" , isauthorized , deletepetpost);

export default router;