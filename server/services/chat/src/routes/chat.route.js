import express from 'express'
import { createConversation, getConversations, getMessage, saveMessage, updateConversations } from '../controller/conversation.controller.js'


const chatRouter = express.Router()


chatRouter.get('/create-conversation',createConversation)
chatRouter.get('/get-conversation',getConversations)
chatRouter.post('/save-message',saveMessage)
chatRouter.get('/getMessage/:conversationId',getMessage)
chatRouter.post('/updateconversation',updateConversations)

export default chatRouter;