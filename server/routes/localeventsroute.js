import { allevents, bookevent, deleteevents, getalluserevents, registerevents, updatevents } from "../Controller/localeventscontroller.js";
import { isauthorized } from "../middlewares/auth.js";
import express from 'express'

const router = express.Router();

router.post('/register/events' , isauthorized , registerevents);
router.get('/getall/events' ,isauthorized, getalluserevents)
router.put('/update/event/:id' , isauthorized , updatevents);
router.delete('/delete/event/:id' , isauthorized , deleteevents);
router.get('/user/allevents'  , allevents)
router.post('/book/event/:id' , isauthorized , bookevent)

export default router;