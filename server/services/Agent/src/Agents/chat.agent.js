import { getModel } from "../config/llm_model.js"

const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const systemprompt = "You are FluxAi , an intelligent Ai Assistant "
    const response = await llm.invoke([
        {
            "role":"system",
            "content":systemprompt
        },
        {
            "role":"human",
            "content":`${state.prompt}`
        }
    ])

    return {
        ...state,
        aiResponse:response.content
    }
}

export default chatAgent