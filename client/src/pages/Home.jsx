import React from 'react'
import { useDispatch } from 'react-redux'
import { toogleTheme } from '../redux/theme/themeSlice'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Artifacts from '../components/Artifacts'
const Home = () => {
  const dispatch = useDispatch()
  return (
    <main className='min-h-screen w-full flex'>
      <Sidebar/>
      <Chat/>
      <Artifacts/>
    </main>
  )
}

{/* <button className='' onClick={()=>dispatch(toogleTheme())}>Theme</button> */}
export default Home