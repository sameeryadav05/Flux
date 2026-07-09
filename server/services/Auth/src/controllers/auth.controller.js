import redis from "../../../../shared/redis/redis.js";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import {getAuth} from 'firebase-admin/auth'
import crypto from 'node:crypto'

export const login = async (req,res)=>{
    try {
        const {token} = req.body
        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({firebaseUID:decoded.uid})

        if(!user)
        {
            user = await User.create({
                firebaseUID:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture
            }) 
        }
        const sessionId = crypto.randomUUID();
        await redis.set(
        `session-${sessionId}`,
        JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }),
        "EX",
        7 * 24 * 60 * 60
        );

        res.cookie("fluxai",sessionId,{
            httpOnly:true,
            secure:false, //prod - true
            sameSite:"strict", //prod - none
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            message:`Welcome ! ${user.name}`,
            success:true,
            user:{
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Authentication Failed , please Try again !"})
    }
}

export const logout = async (req,res)=>{
    try {
        const sessionId = req.cookies?.fluxai;
        await redis.del(`session-${sessionId}`)
        return res.clearCookie('fluxai').status(200).json({
            message:"Logout SuccessFully !",
            success:true
        })
    } 
    catch (error) {
        return res.json({
            message:"something went wrong !",
            success:false
        })
    }
}