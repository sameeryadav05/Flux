import logo from "/favicon.svg";
import { GoSidebarCollapse } from "react-icons/go";
import { HiPlus } from "react-icons/hi2";

import { useCreateConversation } from "../api/ChatService";
import Conversations from "./Conversations";
import { useAuth } from "../utils/AuthProvider";

const Sidebar = () => {
  const { mutate: createConversation, isPending } = useCreateConversation();
  const {user} = useAuth();
  console.log(user);
  return (
    <aside
      className="
      h-screen
      w-[70%]
      md:w-80
      lg:w-72

      flex
      flex-col

      bg-neutral-950

      border-r
      border-neutral-800
    "
    >
      {/* HEADER */}

      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg hover:bg-neutral-900">
            <GoSidebarCollapse size={20} />
          </div>

          <img src={logo} className="w-8 h-8" />

          <h2
            className="font-extrabold text-lg bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 bg-clip-text text-transparent tracking-wider"
          >
            Flux.ai
          </h2>
        </div>

        <span
          className="
          text-xs

          px-3
          py-1

          rounded-full

          bg-violet-500/20

          text-violet-400
        "
        >
          Free
        </span>
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

          bg-white

          text-black

          hover:bg-neutral-200

          transition
        "
        >
          <HiPlus size={18} />

          {isPending ? "Creating..." : "New Chat"}
        </button>
      </div>

      {/* SCROLLABLE CONVERSATIONS */}

      <div className="flex-1 overflow-hidden">
        <Conversations />
      </div>

      {/* PROFILE */}

      <div className="border-t border-neutral-800 p-3">
        <button
          className="
          w-full

          flex
          items-center

          gap-3

          rounded-xl

          p-2

          hover:bg-neutral-900
        "
        >
          <div
            className="
            h-10
            w-10

            rounded-full

            bg-violet-600

            flex

            items-center

            justify-center

            font-semibold
          "
        
          > <img src={user.avatar} className="h-full w-full rounded-full" alt=""/></div>
            
       
          <div className="text-left">
            <p className="text-sm font-medium">{user.name}</p>

            <p className="text-xs text-neutral-400">Free Plan</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
