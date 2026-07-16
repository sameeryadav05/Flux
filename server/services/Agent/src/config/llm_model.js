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
const grok3 = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey:process.env.GROQ_API_KEY_3,
})
// openai/gpt-oss-120b


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
})

export function getModel(agent){
    switch (agent) {
        case "chat":
            return grok1;

        case "search":
            return grok1;

        case "coding":
            return grok2;

        
        default:
            return grok3;
    
    }
}