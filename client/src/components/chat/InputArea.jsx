import React, { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiPaperclip } from "react-icons/fi";
import { useCreateConversation, useUpdateConversation } from "../../api/ChatService";
import { useParams } from "react-router-dom";
import Agents from "./Agents";



const InputArea = ({chatMutation}) => {
  const [agent, setAgent] = useState('Auto');
  const {conversationId} = useParams();
  const textareaRef = useRef(null);
  const [value,setValue] = useState('')
  const { mutateAsync: createConversation, isPending } = useCreateConversation();
      const {mutateAsync:updateConversationTitle} = useUpdateConversation()
  const handleInput = (e) => {
    e.target.style.height = "24px";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };  

  useEffect(()=>{
    textareaRef.current.focus()
  },[])

  async function handleSubmit()
  {
    if (!value.trim()) return;

    let id = conversationId;
    if(!id)
    {
      const conversation = await createConversation();
      id = conversation._id;
      await updateConversationTitle({id, title:value});
    }

    chatMutation.mutate({
      prompt:value,
      conversationId:id,
      agent
    })


      setValue("")
  
    textareaRef.current.style.height = "24px";
    textareaRef.current.focus();

  }

  return (
    <div className=" bg-white dark:bg-neutral-950 px-5 py-4 no-scrollbar custom-scrollbar">

      <div
        className="
          flex items-end justify-center
          gap-5
          rounded-[28px]
          border border-neutral-300
          dark:border-neutral-700
          bg-neutral-100
          dark:bg-neutral-900
          px-2
          py-2
          transition
          focus-within:border-violet-500
        "
      >
      <div className="flex flex-center gap-1">

          <Agents agent={agent} setAgent={setAgent}/>
        {/* Attachment */}
        <button
          className="
            flex
            size-8
            shrink-0
            items-center
            justify-center
            rounded-full
            hover:bg-neutral-200
            dark:hover:bg-neutral-800
            transition
          "
        >
          <FiPaperclip size={16} />
        </button>
      </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          rows={1}
          onInput={handleInput}
          placeholder="Ask Anything ..."
          className="
          w-full
            flex-1
            flex-grow
            resize-none
            bg-transparent
            outline-none
            flex-center
            border-none

            text-[15px]
            leading-6

            placeholder:text-neutral-500
            dark:placeholder:text-neutral-500

            min-h-[24px]
            max-h-[140px]

            overflow-y-auto
            no-scrollbar

            py-1
          "
        />

        {/* Send */}
        <button
          className="
            flex
            size-8
            shrink-0
            items-center
            justify-center
            rounded-full

            bg-white
            dark:bg-neutral-100

            text-black

            transition

            hover:scale-105
            active:scale-95

            disabled:opacity-40
          "
          disabled={!value.trim() || chatMutation.isPending}
          onClick={()=>handleSubmit()}
        >
          <FiArrowUp size={18} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-neutral-500">
        Flux can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default InputArea;