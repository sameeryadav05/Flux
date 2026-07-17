import { useState, useEffect, useRef } from 'react';
import {NavLink } from 'react-router-dom'
import logo from '/favicon.svg'
import { useAuth } from '../../utils/AuthProvider';
import Tooltip from '../Tooltip';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toogleTheme } from '../../redux/theme/themeSlice';
import { GiTwoCoins } from "react-icons/gi";
import { openArtifacts } from '../../redux/Artifcacts/ArtifactSlice';


export default function Navbar({hasArtifacts}) {

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);
   const lastFocusedElementRef = useRef(null)
    const {isMobile}= useAuth()
      const theme = useSelector((state) => state.theme.mode);
      const { isOpen : Artifact } = useSelector(state => state.artifact);

    

  const dispatch = useDispatch();

   const openMenu = () => {
      lastFocusedElementRef.current = document.activeElement;
      setIsMenuOpen(true);

      // Move focus into menu after state update
      setTimeout(() => {
         menuRef.current?.focus();
      }, 0);
   };

   const closeMenu = () => {
      setIsMenuOpen(false);

      // Restore focus after state update
      setTimeout(() => {
         lastFocusedElementRef.current?.focus();
      }, 0);
   };

   useEffect(() => {
      const handleEscapeKey = (e) => {
         if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
         }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [isMenuOpen]);




  

   return (
    <>
      {
          !isMobile  &&<nav
         className="flex py-1 px-2 md:px-8  border-b border-neutral-700/10  dark:border-neutral-700/50  min-h-[50px] relative z-20"
         aria-label="Main navigation"
      >
         <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 w-full">
            <div className="flex-1 flex">
               <NavLink
                  to={'/ai'}
                  className="min-w-8 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded flex-center text-2xl gap-2"
               >
                  {/* <img
                     src={logo}
                     alt="readymadeui logo"
                     className="size-6"
                  /> */}
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
               </NavLink>
            </div>



            <button
            title='Theme'
              className="
              size-10
              flex-center
              rounded-lg
              cursor-pointer

              hover:bg-neutral-100
              dark:hover:bg-neutral-900

              transition-all
              duration-200
            "
              onClick={() => dispatch(toogleTheme())}
            >
              {theme === "dark" ? (
                <CiLight size={22} />
              ) : (
                <MdDarkMode size={22} />
              )}
            </button>



            <button className="text-xs p-2  flex-center gap-1 rounded-md bg-violet-500/20 text-violet-700 dark:text-white">
              upgrade
              
            </button>

{
              hasArtifacts && <button className="text-xs p-2  flex-center gap-1 rounded-md bg-violet-500/20 text-violet-700 dark:text-white" onClick={()=>{
               dispatch(openArtifacts())
            }}>
              Code Panel
              
            </button>
}
         </div>
      </nav>
      }
    </>
   );
};