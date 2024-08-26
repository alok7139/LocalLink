import express from 'express'
import { message } from '../Controller/messagecontroller.js';
const router = express.Router();

router.post('/send/message' , message);

export default router;