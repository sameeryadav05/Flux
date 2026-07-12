import express from 'express'
import dotenv from 'dotenv'; 
dotenv.config();
import process from 'node:process'
import os from 'os'
import connectDb from './config/Db.js';
import mongoose from 'mongoose';
import AuthRouter from './routes/Auth.routes.js';
import cookieParser from 'cookie-parser'
import { getHealthRouteInfo } from '../../../shared/health/health.js';


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const PORT = process.env.PORT || 8001

app.use('/',AuthRouter)

app.get('/health',async (req,res)=>{
    const data = await getHealthRouteInfo(PORT,mongoose)

    return res.json(data)
})

connectDb().then(()=>{
    app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`))
})
