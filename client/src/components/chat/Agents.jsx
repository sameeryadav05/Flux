import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Globe,
  CodeXml,
  FileText,
  Presentation,
  Image,
  MessageCircle,
} from "lucide-react";


const Agents = ({agent, setAgent}) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const agents = [
    {
      icon: <Bot size={16} />,
      label: "Auto",
    },
    {
      icon: <MessageCircle size={16} />,
      label: "Chat",
    },
    {
      icon: <Globe size={16} />,
      label: "Search",
    },
    {
      icon: <CodeXml size={16} />,
      label: "Coding",
    },
    {
      icon: <FileText size={16} />,
      label: "PDF",
    },
    {
      icon: <Presentation size={16} />,
      label: "PPT",
    },
    {
      icon: <Image size={16} />,
      label: "Image",
    },
  ];

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>

  <button
    onClick={() => setOpen((prev) => !prev)}
    className="relative flex items-center justify-center size-9 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
  >
    <Bot size={17} className="text-neutral-900 dark:text-white" />

    {/* Badge */}
    <span
      className="
        absolute
        -top-1.5
        left-1/2
        -translate-x-1/2
        rounded-full
        bg-violet-600
        text-white
        text-[9px]
        font-semibold
        px-1.5
        py-[1px]
        leading-none
        shadow
        pointer-events-none
      "
    >
      {agent}
    </span>
  </button>


      {open && (
        <div className="absolute bottom-10 left-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden z-50">
          {agents.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setAgent(item.label);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition
                ${
                  agent === item.label
                    ? "bg-blue-500 text-white"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Agents;