import { searchTool } from "../config/tavily.js"

const searchAgent = async (state) => {
    try {
        const result = await searchTool.invoke({
            query:state.prompt,
        })
        console.log("Tavily result",result);
        return {
            ...state,
            searchResults:result,
            images:result.images
        }
        
    } catch (error) {
        return {
            ...state,
            searchResults:[],
            images:[]
        }
    }
}

export default searchAgent