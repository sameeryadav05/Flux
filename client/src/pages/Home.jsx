import React from 'react'
import { useDispatch } from 'react-redux'
import { toogleTheme } from '../redux/theme/themeSlice'
import Sidebar from '../components/Sidebar'
import Chat from '../components/chat/Chat'
import Artifacts from '../components/Artifacts'
import { useAuth } from '../utils/AuthProvider'
import { GoSidebarCollapse } from 'react-icons/go'
import { Outlet } from 'react-router-dom'
const Home = () => {
  const dispatch = useDispatch()
  const {  isCollapsed,
        setIsCollapsed,
        isMobile,
        setIsMobile,
        isOpen,
        setIsOpen } = useAuth();
  return (
    <main className='min-h-screen w-full flex'>
        {!isMobile && <Sidebar/> }
        {(isMobile&&isOpen) && <Sidebar/>} 
        {(isMobile&&!isOpen) && <>
      
            <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition fixed top-2 left-2 z-50"      onClick={()=>{
              if(isMobile)
              {
                setIsOpen(true);
              }
            }}>
              <GoSidebarCollapse size={20} />
          </button>

      </>}
      <Outlet/>
      {/* <Artifacts/> */}
    </main>

    
  )
}

export default Home