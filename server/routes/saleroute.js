import { allsales, deletesale, fetchsaledetails, registersale, updatesaleservice, usersale } from "../Controller/salecontroller.js";
import express from 'express'
import { isauthorized } from "../middlewares/auth.js";


const router = express.Router();

router.post("/post/sale/service" , isauthorized , registersale);
router.get("/get/allsale/post" ,allsales)
router.get("/get/user/sale" , isauthorized , usersale);
router.delete("/delete/sale/service/:id" , isauthorized , deletesale);
router.put("/updated/sale/:id" , isauthorized , updatesaleservice)
router.get("/fetch/sale/:id" , isauthorized , fetchsaledetails);

export default router;