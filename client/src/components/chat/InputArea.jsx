import React, { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiPaperclip } from "react-icons/fi";

const InputArea = () => {
  const textareaRef = useRef(null);
  const [value,setValue] = useState('')

  const handleInput = (e) => {
    e.target.style.height = "24px";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };  

  useEffect(()=>{
    textareaRef.current.focus()
  },[])

  function handleSubmit()
  {
    if (!value.trim()) return;

    alert(value);
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
          disabled={!value.trim()}
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