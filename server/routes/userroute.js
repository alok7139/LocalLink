import { getuser, login, logout, register } from "../Controller/Usercontroller.js";
import express from 'express'
import { isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/user/register" , register);
router.get("/user/login" , login);
router.get('/user/logout' ,isauthorized, logout);
router.get('/user/getuser' , isauthorized, getuser)

export default router;