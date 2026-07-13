import React from 'react'
import Navbar from './Navbar'
import ChatArea from './ChatArea'
import InputArea from './inputArea'

const Chat = () => {
  return (
    <div className='flex-1 md:flex flex-col border-r border-neutral-200 dark:border-neutral-800 p-1'>
      <Navbar/>
      <ChatArea/>
      <InputArea/>
    </div>
  )
}

export default Chat