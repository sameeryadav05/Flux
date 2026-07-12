import React from "react";
import { Link } from "react-router-dom";
import logo from "/favicon.svg";

import {
  GoSidebarCollapse,
  GoSidebarExpand,
} from "react-icons/go";
import { useCreateConversation } from "../api/ChatService";
import Conversation from "../../../server/services/Chat/src/models/conversation.model";


const Sidebar = ({ open = true }) => {
  const { mutate: createConversation, isPending } = useCreateConversation();



  return (
    <aside className={`top-0 left-0 z-50 h-screen  w-[65%] lg:w-72 shrink-0 border-r border-neutral-200 dark:border-neutral-800`}
    >
      {/* Header */}

      <div className="flex items-center  justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">

        <div className="flex gap-2">
              <button className="p-1 lg:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <GoSidebarCollapse size={20} />
              </button>

            <div className="flex items-center gap-2 md:gap-3">
              <img src={logo} className="w-6 h-6 lg:w-8 lg:h-8"/>

              <div>
                <h2 className="font-extrabold text-lg         bg-gradient-to-r
                from-neutral-900
                to-neutral-500
                dark:from-white
                dark:to-neutral-500
                bg-clip-text
            text-transparent tracking-wider">Flux.ai</h2>


                
              </div>

            </div>
        </div>

        <span className="bg-indigo-600/50 text-xs text-white px-2 py-0.5 rounded-full tracking-wide flex-center">Free</span>


      
      </div>



      {/* New Chat */}
      <div className="w-full p-2 flex flex-col">
        <button className="btn w-full flex-center gap-2"><div className="text-center" onClick={()=>createConversation()}>+</div> New Chat</button>


        <Conversation/>

      </div>






    </aside>
  );
};

export default Sidebar;