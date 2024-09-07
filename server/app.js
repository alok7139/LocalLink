import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbconnection } from './database/database.js';
import messagerouter from './routes/messageroute.js'
import { errormiddleware } from './middlewares/error.js';
import useroute from './routes/userroute.js'
import localevents from './routes/localeventsroute.js'
import gardenroute from './routes/gardenroute.js'


const app = express();

configDotenv({path:'./.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET" , "DELETE" , "PATCH" , "PUT" , "POST"],
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/",
}))


app.use('/api/v1', messagerouter);
app.use('/api/v1' ,useroute);
app.use('/api/v1' , localevents);
app.use('/api/v1' , gardenroute);

dbconnection();

app.use(errormiddleware);

export default app;