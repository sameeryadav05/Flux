import logo from "/favicon.svg";
import { GoSidebarCollapse } from "react-icons/go";
import { HiPlus } from "react-icons/hi2";
import { IoExitOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { motion, AnimatePresence } from "motion/react";
import { useCreateConversation, useLogout } from "../api/ChatService";

import { useAuth } from "../utils/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";
import Conversations from "./chat/Conversations";
import { GiTwoCoins } from "react-icons/gi";


const Sidebar = () => {
  const { mutate: createConversation, isPending } = useCreateConversation();
  const { user ,         isCollapsed,
        setIsCollapsed,
        isMobile,
        setIsMobile,
        isOpen,
        setIsOpen } = useAuth();
  const logoutQuery = useLogout()
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();


  if(isCollapsed && !isMobile)
  {
    return (
      <>
             <aside
      className={`
      h-screen
      md:w-16


      flex
      flex-col

      bg-white
      dark:bg-neutral-950

      border-r
      border-neutral-200
      dark:border-neutral-800
    `}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
     
        <Tooltip text={isCollapsed?"open sidebar":"close sidebar"} position="right">
            <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              onClick={()=>{
                if(isMobile)
                {
                  setIsOpen(false);
                }
                else{
                    setIsCollapsed(prev=>!prev)
                }
              }}
            >
                  <GoSidebarCollapse size={20} />
            </button>
        </Tooltip>

      </div>

      {/* NEW CHAT */}

      <div className="p-3">
        <Tooltip text={'New Chat'} position="right">
                      <button
          onClick={createConversation}
          disabled={isPending}
          className="
          
          flex
          items-center
          justify-center
          p-3

          bg-neutral-900
          text-white
              text-3xl
          hover:bg-black

          dark:bg-white
          dark:text-black
          dark:hover:bg-neutral-200
            rounded-full
          transition
        "
        >
          <HiPlus size={18} />
        </button>
        </Tooltip>
      </div>

      {/* CONVERSATIONS */}




{/* PROFILE */}

<div className="mt-auto  dark:border-neutral-800 p-3">
  <div className="flex justify-center flex-col gap-2">
    <img
      src={user.avatar}
      className="size-10 rounded-full"
      alt="avatar"
    />

      <button className="text-xs flex-center rounded-lg bg-violet-500/20 text-violet-700 dark:text-white">
            free
      </button>
  </div>
</div>
    </aside>
      
      
      </>
    )
  }












  return (
    <>
    {

    <aside
      className={`
      h-screen
      w-full
      md:w-56
      lg:w-72

      flex
      flex-col

      bg-white
      dark:bg-neutral-950

      border-r
      border-neutral-200
      dark:border-neutral-800
    `}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
     
        <div className="flex flex-center gap-3">

            <div className="flex flex-center gap-2 cursor-pointer">
                  <img src={logo} className="w-6 h-6" />

            </div>




        </div>

    <Tooltip text={isCollapsed?"open sidebar":"close sidebar"} position={isMobile ? "left" : "right"}>
        <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
          onClick={()=>{
            if(isMobile)
            {
              setIsOpen(false);
            }
            else{
                setIsCollapsed(prev=>!prev)
            }
          }}
        >
              <GoSidebarCollapse size={20} />
        </button>
    </Tooltip>

      </div>

      {/* NEW CHAT */}

      <div className="p-3">
        <button
          onClick={createConversation}
          disabled={isPending}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          py-3

          bg-neutral-900
          text-white

          hover:bg-black

          dark:bg-white
          dark:text-black
          dark:hover:bg-neutral-200

          transition
        "
        >
          <HiPlus size={18} />

          New Chat
        </button>
      </div>

      {/* CONVERSATIONS */}

      <div className="flex-1 overflow-hidden">
        <Conversations />
      </div>

      {/* PROFILE */}

    

      <div className="mt-auto border-t border-neutral-200 dark:border-neutral-800 p-3 flex flex-col gap-2">
        <div className="w-full flex items-center justify-between rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition">
          <div className="flex-center gap-3">

           
                <img src={user.avatar} className="size-8 md:size-10 rounded-full" alt="avatar-2"/>
            

            <div className="text-left flex flex-col">
              <p className="text-xs md:text-xs lg:text-sm font-medium text-neutral-900 dark:text-white truncate">
                {user?.name}
              </p>
              <span className="text-[12px] md:text-xs text-neutral-900/45 dark:text-neutral-300/30">Free plan</span>
            </div>
          </div>

          <button className="text-sm px-2 py-1  flex-center gap-2 rounded-md bg-violet-500/20 text-violet-700 dark:text-white">
            <GiTwoCoins size={12}/>
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-4 rounded-xl p-2">

   
          <button
            onClick={()=>logoutQuery.refetch()}
            className="
            bg-red-700
            hover:bg-red-600

            text-white
            flex-center

            p-2
            flex-1

            rounded-xl

            active:scale-95

            transition-all

            duration-100

            gap-3

            text-md

            font-semibold
          "
          >
            Logout
            <span className="flex-center ml-[1.5px]">
              <IoExitOutline />
            </span>
          </button>
   

{
  isMobile &&            
  <Tooltip text={'Toogle theme'}>
            <button
              className="
              size-10
              flex-center
              rounded-lg
              cursor-pointer

              hover:bg-neutral-100
              dark:hover:bg-neutral-900

              transition
            "
              onClick={() => dispatch(toogleTheme())}
            >
              {theme === "dark" ? (
                <CiLight size={22} />
              ) : (
                <MdDarkMode size={22} />
              )}
            </button>
          </Tooltip>
}
        </div>
      </div>
    </aside>
    }
    </>
  );
};

export default Sidebar;


