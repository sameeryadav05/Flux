import axios from '../config/Axios.js'
import { addMessage } from '../config/Memory.js'
import graph from '../graph/graph.js'


export const agent=async(req,res)=>{
    try {
        
        let {prompt,conversationId , agent } = req.body
        agent = (agent || "Auto").trim().toLowerCase();
        console.log("user selected agent",agent);
        const { data: userMessage }  = await axios.post('/save-message',{

            conversationId,role:"user",content:prompt
        })
        const result = await graph.invoke({
            prompt,
            conversationId,
            agent
        })
        const response = result.aiResponse
        await addMessage(conversationId,"user",prompt);
        await addMessage(conversationId,"assistant",response)
        const { data: assistantMessage }  = await axios.post("/save-message", {
            conversationId,
            role: "assistant",
            content: response,
        });
        

        return res.status(200).json({
            role:assistantMessage.role,
            content:assistantMessage.content
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`Something went wrong with Ai Agent ${error}`})
    }
}