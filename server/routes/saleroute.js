import { allsales, deletesale, registersale, usersale } from "../Controller/salecontroller.js";
import express from 'express'
import { isauthorized } from "../middlewares/auth.js";


const router = express.Router();

router.post("/post/sale/service" , isauthorized , registersale);
router.get("/get/allsale/post" ,allsales)
router.get("/get/user/sale" , isauthorized , usersale);
router.delete("/delete/sale/service/:id" , isauthorized , deletesale);

export default router;