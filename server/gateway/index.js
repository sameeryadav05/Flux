import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import morgan from 'morgan'
import proxy from 'express-http-proxy';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { protect } from './middlewares/Auth.middleware.js';
import {getGatewayHealth} from './utils/gateway.health.js'
import { proxyWithHeader } from './utils/proxyHeader.js';

const app = express();


app.use(morgan('dev'))
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
}))
app.use(cookieParser())
// app.disable("etag")
app.use("/auth",proxy(process.env.AUTH_SERVICE_URI))
app.use("/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE_URI))

app.get('/me',protect,(req,res)=>{
    try {
        const {user} = req;
        if(!user)
        {
            return res.status(401).json({message:"Un-Authorized"})
        }
        return res.status(200).json({
            user,
            message:"User Info",
            success:true
        })
    } 
    catch (error) {
        console.log("Me Error : ",error);
         return res.status(401).json({message:"Un-Authorized"})
    }
})

app.get('/health',async (req,res)=>{
    const data = await getGatewayHealth();
    res.json(data) 
})

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})