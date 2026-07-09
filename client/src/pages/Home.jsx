import React from 'react'
import { useDispatch } from 'react-redux'
import { toogleTheme } from '../redux/theme/themeSlice'
const Home = () => {
  const dispatch = useDispatch()
  return (
    <main className='min-h-screen w-full'>

      <button className='' onClick={()=>dispatch(toogleTheme())}>Theme</button>
    </main>
  )
}

export default Home