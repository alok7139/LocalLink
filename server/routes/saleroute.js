import { registersale } from "../Controller/salecontroller.js";
import express from 'express'
import { isauthorized } from "../middlewares/auth.js";


const router = express.Router();

router.post("/post/sale/service" , isauthorized , registersale);

export default router;