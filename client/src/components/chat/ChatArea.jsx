
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import EmptyChat from './EmptyChat'
import { SecondaryLoader } from '../loader'
import MessageBubble from '../MessageBubble'
import { useChat } from '../../api/ChatService'
import { useDispatch } from 'react-redux'
import { clearArtifacts, openArtifacts, setArtifacts } from '../../redux/Artifcacts/ArtifactSlice'




const ChatArea = ({messagesQuery,chatMutation}) => {
const { conversationId } = useParams();
const { data = [], isLoading } = messagesQuery;
const dispatch = useDispatch();



const previousArtifactCount = useRef(0);

// useEffect(() => {
//   const latestArtifactMessage = [...data]
//     .reverse()
//     .find(msg => msg.artifacts?.length);

//   if (!latestArtifactMessage) {
//     previousArtifactCount.current = 0;
//     dispatch(clearArtifacts());
//     return;
//   }

//   dispatch(setArtifacts(latestArtifactMessage.artifacts));

//   const currentCount = latestArtifactMessage.artifacts.length;

//   // Open only when a NEW artifact appears
//   if (
//     currentCount > 0 &&
//     previousArtifactCount.current === 0
//   ) {
//     dispatch(openArtifacts());
//   }

//   previousArtifactCount.current = currentCount;
// }, [data, dispatch]);

if (isLoading) {
  return (
    <div className="flex-1 flex-center">
      <SecondaryLoader />
    </div>
  );
}

  return (
    <>
    {
      <div className='flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 space-y-5 custom-scrollbar scroll-smooth mt-12 md:mt-0'>
         {
          (data.length == 0 || !conversationId) ? <div className='h-full flex-center'><EmptyChat/> </div>: 

          <div>
            {
              data.map((message,index)=>{
                return (
                  <div key={index} className="mx-auto w-full max-w-4xl">
                      <MessageBubble role={message?.role} content={message?.content} isThinking={message?.isThinking} images={message?.images}/>
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