import express from 'express'
import dotenv from 'dotenv'; 
dotenv.config();
import connectDb from './config/Db.js'
import {getHealthRouteInfo} from "../../../shared/health/health.js"
import mongoose from 'mongoose';
import agentRouter from './routes/agent.route.js';


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const PORT = process.env.PORT || 8003

app.get('/health',async (req,res)=>{
    const data = await getHealthRouteInfo(PORT,mongoose)
    return res.json(data)
})

app.use('/',agentRouter)



connectDb().then(()=>{
    app.listen(PORT,()=>console.log(`Agent service is listening on port ${PORT}`))
})
