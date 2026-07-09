import express from 'express'
import dotenv from 'dotenv'; 
dotenv.config();
import process from 'node:process'
import os from 'os'
import connectDb from './config/Db.js';
import mongoose from 'mongoose';
import { formatUptime } from './utils/utitlity_fn.js';
import AuthRouter from './routes/Auth.routes.js';
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/',AuthRouter)

const PORT = process.env.PORT || 8001

app.get('/health',(req,res)=>{
    const dbStatus = {
        0: "Disconnected",
        1: "Connected",
        2: "Connecting",
        3: "Disconnecting"
    };

    return res.json({
        Auth_Service:{
            status:"Running",
            PORT,
            Database:dbStatus[mongoose.connection.readyState],
            uptime:formatUptime(process),
            node_version: process.version,
            
            system:{
                Architecture:process.arch,
                platform:process.platform,
                hostname: os.hostname(),
                cpu_cores: os.cpus().length,
            }
        }
    })
})

connectDb().then(()=>{
    app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`))
})
