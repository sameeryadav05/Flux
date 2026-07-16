import { StateGraph } from '@langchain/langgraph'
import {AgentState} from './state.js'
import { Router } from './Router.Agent.js'
import chatAgent from './../Agents/chat.agent.js'
import searchAgent from '../Agents/search.agent.js'
import pptAgent from '../Agents/ppt.agent.js'
import codingAgent from '../Agents/coding.agent.js'
import pdfAgent from '../Agents/pdf.agent.js'
import imageAgent from '../Agents/image.agent.js'

const workflow = new StateGraph(AgentState)

workflow.addNode('router',Router)
workflow.addNode('chat',chatAgent)
workflow.addNode('search',searchAgent)
workflow.addNode('coding',codingAgent)
workflow.addNode('ppt',pptAgent)
workflow.addNode('pdf',pdfAgent)
workflow.addNode('imagegen',imageAgent)

workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>{
    switch (state.agent) {
        case "chat":
            return "chat";
            break;
        case "search":
            return "search";
            break;
        case "coding":
            return "coding";
            break;
        case "ppt":
            return "ppt"
            break;
        case "pdf":
            return "pdf"
            break;
        case "imagegen":
            return "imagegen"
            break;

    
        default:
            return "chat"
            break;
    }
}, {
    chat:"chat",
    search:"search",
    coding:"coding",
    ppt:"ppt",
    pdf:"pdf",
    imagegen:"imagegen"


})

workflow.addEdge('search',"chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("imagegen","__end__")

const graph = workflow.compile();

export default graph