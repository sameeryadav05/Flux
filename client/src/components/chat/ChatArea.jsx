
import React from 'react'
import { useParams } from 'react-router-dom'
import EmptyChat from './EmptyChat'
import { SecondaryLoader } from '../loader'
import MessageBubble from '../MessageBubble'


const ChatArea = ({messagesQuery}) => {
  const {data = [] , isLoading } = messagesQuery  
  useGetMessages
  console.log("messeage data",data);
  const {conversationId} = useParams()
  console.log(conversationId);
    if(isLoading)
    {
      return <div className='flex-1 flex-center'>
          <SecondaryLoader/>
      </div>
    }
  return (
    <>
    {
      <div className='flex-1 overflow-y-auto overflow-x-hidden px-6 py-3 space-y-5 no-scrollbar custom-scrollbar'>
         {
          (data.length == 0 || !conversationId) ? <div className='h-full flex-center'><EmptyChat/> </div>: 

          <div>
            {
              data.map((message,index)=>{
                return (
                  <div key={index}>
                      <MessageBubble role={message?.role} content={message?.content} />
                  </div>
                )
              })
            }


          </div>
         }
      </div>
    }
    </>
  )
}

export default ChatArea