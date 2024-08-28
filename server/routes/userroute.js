import { login, register } from "../Controller/Usercontroller.js";
import express from 'express'

const router = express.Router();

router.post("/user/register" , register);
router.get("/user/login" , login);

export default router;