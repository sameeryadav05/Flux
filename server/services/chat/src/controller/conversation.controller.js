import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export async function createConversation(req,res)
{
    try {
        const userId = req.headers["x-user-id"]
        console.log(userId);
        const conversation = await Conversation.create({userId})

        return res.status(200).json(conversation);
    } 
    catch (error) {
        return res.status(400).json({message:`Internal Server Error ! \n Error: \n ${error}`})
    }
}   

export async function getConversations(req,res)
{
    try {
        const userId = req.headers["x-user-id"]
        console.log(userId);
        let conversations = await  Conversation.find({userId}).sort({updatedAt:-1})

        return res.json(conversations)
    } 
    catch (error) {
        return res.status(500).json({message:`Failed TO load Conversations ! \n Error: \n ${error}`})
    }
}

export async function updateConversations(req,res)
{
    try {
        const {id,title} = req.body
        const conversation = await Conversation.findByIdAndUpdate(id,{title})
        

        return res.json(conversation)
    } 
    catch (error) {
        return res.status(500).json({message:`Failed TO load Conversations ! \n Error: \n ${error}`})
    }
}

export async function saveMessage(req,res){
    try {
        const {conversationId,role,content} = req.body

        if(!conversationId || !role || !content)
        {
            return res.status(400).json({message:"Insufficient Data !"})
        }

        const message = await Message.create({conversationId,role,content})

        return res.json(200).json(message)
        
    } catch (error) {
        return res.status(500).json({message:`Request Cannot be Fullfilled ! \n Error : \n ${error}`})
    }
}

export async function getMessage(req,res){
    try {
        const {conversationId} = req.params

        if(!conversationId)
        {
            return res.status(400).json({message:"Insufficient Data !"})
        }

        const messages = await Message.find({conversationId}).sort({createdAt:-1})

        return res.json(200).json(messages)
        
    } catch (error) {
        return res.status(500).json({message:`Failed to load ! \n Error : \n ${error}`})
    }
}