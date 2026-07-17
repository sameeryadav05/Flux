import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toogleTheme } from '../redux/theme/themeSlice'
import Sidebar from '../components/Sidebar'
import Chat from '../components/chat/Chat'
// import {useDispatch} from 'react-redux'
import { useAuth } from '../utils/AuthProvider'
import { GoSidebarCollapse } from 'react-icons/go'
import { Outlet, useParams } from 'react-router-dom'
import Artifacts from '../components/Artifacts/Artifacts'
import { clearArtifacts, openArtifacts, setArtifacts } from '../redux/Artifcacts/ArtifactSlice'
import { useGetMessages } from '../api/ChatService'
const Home = () => {
  const {conversationId} = useParams();
  const dispatch = useDispatch()
  const messagesQuery = useGetMessages(conversationId)

  const latestArtifactMessage = useMemo(() => {
    return [...(messagesQuery.data ?? [])]
        .reverse()
        .find(msg => msg.artifacts?.length);
}, [messagesQuery.data]);

useEffect(() => {
    if (latestArtifactMessage) {
        dispatch(setArtifacts(latestArtifactMessage.artifacts));
    } else {
        dispatch(clearArtifacts());
    }
}, [latestArtifactMessage]);


  const {  isCollapsed,
        setIsCollapsed,
        isMobile,
        setIsMobile,
        isOpen,
        setIsOpen } = useAuth();

      const { artifacts, isOpen:isArtifactOpen } = useSelector(
        (state) => state.artifact
    );

   

    
      const hasArtifacts = messagesQuery?.data?.some(
        msg => msg.artifacts?.length
      );

  return (
    <main className='h-screen w-full flex overflow-hidden'>
        {!isMobile && <Sidebar/> }
        {(isMobile&&isOpen) && <Sidebar/>} 
        {(isMobile&&!isOpen) && <>
            <div className='flex justify-between items-center'>
              <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition fixed top-2 left-2 z-50"      onClick={()=>{
                if(isMobile)
                {
                  setIsOpen(true);
                }
              }}>
                <GoSidebarCollapse size={20} />
            </button>

              {

              (isMobile && hasArtifacts   )&&  <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition fixed top-2 right-2 z-50 "    onClick={()=>dispatch(openArtifacts())}>
                Code panel
            </button>

              }
            </div>
      </>}

<div className="flex flex-1 overflow-hidden">
  {isMobile ? (
    isArtifactOpen ? (
      <Artifacts />
    ) : (
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    )
  ) : (
    <>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {isArtifactOpen && <Artifacts />}
    </>
  )}
</div>
    </main>

    
  )
}

export default Home