import { getallevents, registerevents } from "../Controller/localeventscontroller.js";
import { isauthorized } from "../middlewares/auth.js";
import express from 'express'

const router = express.Router();

router.post('/register/events' , isauthorized , registerevents);
router.get('/getall/events' , getallevents)

export default router;