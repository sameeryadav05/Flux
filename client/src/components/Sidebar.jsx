import logo from "/favicon.svg";
import { GoSidebarCollapse } from "react-icons/go";
import { HiPlus } from "react-icons/hi2";
import { IoExitOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { useCreateConversation, useLogout } from "../api/ChatService";
import Conversations from "./Conversations";
import { useAuth } from "../utils/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";


const Sidebar = () => {
  const { mutate: createConversation, isPending } = useCreateConversation();
  const { user } = useAuth();
  const logoutQuery = useLogout()
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();



  return (
    <aside
      className="
      h-screen
      w-[70%]
      md:w-80
      lg:w-72

      flex
      flex-col

      bg-white
      dark:bg-neutral-950

      border-r
      border-neutral-200
      dark:border-neutral-800
    "
    >
      {/* HEADER */}

      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
     
        <div className="flex flex-center gap-1">
              <div className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition">
            <GoSidebarCollapse size={20} />
          </div>

            <div className="flex flex-center gap-2">
                  <img src={logo} className="w-6 h-6" />
                  <h2
                    className="
                    font-extrabold
                    text-lg
                    bg-gradient-to-r
                    from-neutral-900
                    to-neutral-500
                    dark:from-white
                    dark:to-neutral-500
                    bg-clip-text
                    text-transparent
                    tracking-wider
                  "
                  >
                    Flux.ai
                  </h2>
            </div>


        </div>

            <div className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-700">
                Free
            </div>

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

          {isPending ? "Creating..." : "New Chat"}
        </button>
      </div>

      {/* CONVERSATIONS */}

      <div className="flex-1 overflow-hidden">
        <Conversations />
      </div>

      {/* PROFILE */}

      <div className="border-t border-neutral-200 dark:border-neutral-800 p-3 flex flex-col gap-2">
        <div className="w-full flex items-center justify-between rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition">
          <div className="flex-center gap-3">

           
                <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar-2"/>
            

            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {user?.name}
              </p>
            </div>
          </div>

          <button className="text-sm p-2 flex-center rounded-md bg-violet-500/20 text-violet-700 dark:text-white">
            upgrade
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-4 rounded-xl p-2">
          <button
            onClick={()=>logoutQuery.refetch()}
            className="
            bg-red-700
            hover:bg-red-600

            text-white

            flex-1
            flex-center

            p-2

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

            <span className="flex-center">
              <IoExitOutline />
            </span>
          </button>

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
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


