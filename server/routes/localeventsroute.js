import { allevents, deleteevents, getalluserevents, registerevents, updatevents } from "../Controller/localeventscontroller.js";
import { isauthorized } from "../middlewares/auth.js";
import express from 'express'

const router = express.Router();

router.post('/register/events' , isauthorized , registerevents);
router.get('/getall/events' , getalluserevents)
router.put('/update/event/:id' , isauthorized , updatevents);
router.delete('/delete/event/:id' , isauthorized , deleteevents);
router.get('/user/allevents'  , allevents)

export default router;