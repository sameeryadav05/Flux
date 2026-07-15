import { getModel } from "../config/llm_model.js"


export const Router = async(state)=>{
        const llm = await getModel("router")
        const prompt = `You are an Agent Router.
                Available Agents:
                    - chat
                    - search
                    - coding
                    - pdf
                    - ppt
                    - imageGen

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

                - imageGen
                    questions related to image generation or create image

                Return only one word : 
                
                chat
                search
                coding
                pdf
                ppt
                imageGen

                user query : 
                ${state.prompt}
        `

        const response = await llm.invoke([
    {
        role: "system",
        content: prompt
    },
    {
        role: "user",
        content: state.prompt
    }
])
        console.log(response);
        return {
            ...state,
            agent: response.content.trim().toLowerCase()
        }
}  