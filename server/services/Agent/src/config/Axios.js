import {create} from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const axios = create({
    baseURL:process.env.CHAT_SERVICE_URI
})  

export default axios;