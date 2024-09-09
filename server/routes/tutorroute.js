import express from 'express'
import { isauthorized } from "../middlewares/auth.js";
import { registertutor } from '../Controller/tutorcontroller.js';

const router = express.Router();

router.post("/post/tutor/service" , isauthorized , registertutor);

export default router;