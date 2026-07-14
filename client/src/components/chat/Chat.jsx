import React from 'react'
import Navbar from './Navbar'
import ChatArea from './ChatArea'
import InputArea from './InputArea'
import { useParams } from 'react-router-dom'
import { useChat, useGetMessages } from '../../api/ChatService'

const Chat = () => {
  const {conversationId} = useParams();
  const messagesQuery = useGetMessages(conversationId)
      const chatMutation = useChat()
  return (
    <div className='flex flex-1 flex-col border-r border-neutral-200 dark:border-neutral-800 p-1'>
      <Navbar/>
      <ChatArea messagesQuery={messagesQuery}/>
      <InputArea chatMutation={chatMutation} />
    </div>
  )
}

export default Chat