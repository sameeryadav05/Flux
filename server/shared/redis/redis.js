import Redis from 'ioredis'

const redis = new Redis({
  host: "localhost",
  port: 6379,
  password: "sameer_2005",
})


redis.on('connect',()=>console.log("Redis Connected"))

redis.on('error',(error)=>{
    console.log("Error Occured in Redis => ",error);
})

export default redis;