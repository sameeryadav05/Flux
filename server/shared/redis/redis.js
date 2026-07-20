import Redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASS,
})





redis.on('connect',()=>console.log("Redis Connected"))

redis.on('error',(error)=>{
    console.log("Error Occured in Redis => ",error);
})

export default redis;