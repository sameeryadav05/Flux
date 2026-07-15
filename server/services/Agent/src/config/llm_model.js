import { ChatGroq } from "@langchain/groq"
import dotenv from 'dotenv'
dotenv.config()
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const grok1 = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey:process.env.GROQ_API_KEY_1,
})
const grok2 = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey:process.env.GROQ_API_KEY_2,
})
// openai/gpt-oss-120b


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
})

export function getModel(agent){
    switch (agent) {
        case "chat":
            return gemini;
            break;
        case "search":
            return grok1;
            break;
        case "coding":
            return grok2;
            break;
        
        default:
            return grok2;
    
    }
}