import { ChatGroq } from "@langchain/groq"
import { ChatOpenRouter } from "@langchain/openrouter";

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
    model: "gemini-2.5-flash",
    apiKey:process.env.GOOGLE_API_KEY
})



const openrouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature:0,
  maxTokens:2500,
  apiKey:process.env.OPENROUTER_API_KEY
  // other params...
});

export function getModel(agent){
    switch (agent) {
        case "chat":
            return grok2;

        case "search":
            return grok2;

        case "coding":
            console.log("coding Agent used");
            return openrouter;
            
        case "image":
            return grok3;
        
        default:
            return grok3;
    
    }
}
