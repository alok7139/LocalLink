import { isauthorized  } from "../middlewares/auth.js";
import express from 'express'
import { registerservice } from "../Controller/handymancontroller.js";

const router = express.Router();

router.post("/post/handyman/service" , isauthorized, registerservice);

export default router;