import React from 'react'
import Navbar from './Navbar'
import ChatArea from './ChatArea'
import InputArea from './InputArea'
import { useParams } from 'react-router-dom'
import { useChat, useGetMessages } from '../../api/ChatService'

const Chat = () => {
  const {conversationId} = useParams();
  const messagesQuery = useGetMessages(conversationId)


  const hasArtifacts = messagesQuery?.data?.some(
    msg => msg.artifacts?.length
  );


      const chatMutation = useChat()
  return (
    <div className='flex h-full flex-1 flex-col overflow-hidden border-r border-neutral-200 dark:border-neutral-800'>
      <Navbar hasArtifacts={hasArtifacts}/>
      <ChatArea messagesQuery={messagesQuery} chatMutation={chatMutation}/>
      <InputArea chatMutation={chatMutation} />
    </div>
  )
}

export default Chat