import { agent } from "../controllers/agent.controller.js";


import express from 'express'

const agentRouter = express.Router()

agentRouter.post('/chat',agent)


export default agentRouter