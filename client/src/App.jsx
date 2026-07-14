import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from './utils/firebase'
import Spinner, { SecondaryLoader } from './components/loader'
import {useLogin} from './api/AuthService'
import Auth from './pages/Auth'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoutes, PublicRoutes } from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LandingPage from './pages/Landing'
import EmptyChat from './components/chat/EmptyChat'
import Chat from './components/chat/Chat'




  const Router = createBrowserRouter([
    {
      path:'/',
      element:<PublicRoutes><LandingPage/></PublicRoutes>
      
    },
    {
      path:'/ai',
      element:<ProtectedRoutes> <Home/> </ProtectedRoutes>,
      children:[
        {
          index:true,
          element:<Chat/>
        },
        {
          path:':conversationId',
          element:<Chat/>
        }
      ]
    },
    {
      path:'/auth',
      element:<PublicRoutes> <Auth/> </PublicRoutes>
    },
    {
      path:'*',
      element:<NotFound/>
    }
  ])

const App = () => {

  return (
    <RouterProvider router={Router} />
    
  )
}

export default App



