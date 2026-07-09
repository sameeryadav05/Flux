import redis from "../../shared/redis/redis.js";


export const protect = async (req,res,next)=>{
    try {
        const sessionId = req.cookies?.fluxai;

        if(!sessionId)
        {
            return res.status(401).json({message:"session expired !"})
        }
        const session = await redis.get(`session-${sessionId}`)
        if(!session)
        {
            return res.status(401).json({message:"session expired !"})
        }

        req.user = JSON.parse(session);
        next();

    } 
    catch (error) {
        console.log("gateway error",error);
        return res.status(502).json({
            message:"gateway error",
            success:false
        })
    }
}