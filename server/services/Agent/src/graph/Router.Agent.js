import { getModel } from "../config/llm_model.js"


export const Router = async(state)=>{
    if(state.agent && state.agent !== "auto")
    {  
        console.log("Responsed with ",state.agent , "agent");
        return {
            ...state,
            agent:state.agent.trim().toLowerCase()
        }

    }
        const llm = await getModel("router")
        const systemPrompt = `You are an Agent Router.
                Available Agents:
                    - chat
                    - search
                    - coding
                    - pdf
                    - ppt
                    - image

                Rules:
                - chat : 
                    General conversation,
                    explanations,
                    learning,
                    questions.
                
                - search :
                    current events,
                    latest information,
                    news,
                    recent developments,
                    internet lookup.

                - coding : 
                    generate code
                    debug code
                    build projects
                    architecture
                    Api design

                - pdf :
                    questions abouts generate pdf
                    or document context
                
                - ppt : 
                    questions about generate ppt or presentation
                    or ppt context

                - image
                    questions related to image generation or create image or Ai art

                Return only one word & Never explain your answer.
                
                chat
                search
                coding
                pdf
                ppt
                image

        `

    const response = await llm.invoke([
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: state.prompt
        }
    ])

    console.log("Router Agent response : ",response.content);

    const validAgents = [
        "chat",
        "search",
        "coding",
        "pdf",
        "ppt",
        "image",
    ];

let agent = response.content
    .trim()
    .toLowerCase()
    .replace(/[^\w]/g, "");

if (!validAgents.includes(agent)) {
    agent = "chat";
}

        return {
            ...state,
            agent: response.content.trim().toLowerCase()
        }
}  