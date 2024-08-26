import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'


const app = express();

configDotenv({path:'./env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL]
}))