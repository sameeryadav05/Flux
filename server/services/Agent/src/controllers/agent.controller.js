import axios from '../config/Axios.js'
import { addMessage } from '../config/Memory.js'
import graph from '../graph/graph.js'


export const agent=async(req,res)=>{
    try {
        
        const {prompt,conversationId} = req.body
        await addMessage(conversationId,"user",prompt);
        const { data: userMessage }  = await axios.post('/save-message',{

            conversationId,role:"user",content:prompt
        })
        const result = await graph.invoke({
            prompt,
            conversationId,
        })
        const response = result.aiResponse
        await addMessage(conversationId,"assistant",response)
        const { data: assistantMessage }  = await axios.post("/save-message", {
            conversationId,
            role: "assistant",
            content: response,
        });
        

        return res.status(200).json({
            userMessage,
            assistantMessage
        })

    } catch (error) {
        
        return res.status(500).json({message:`Something went wrong with Ai Agent ${error}`})
    }
}