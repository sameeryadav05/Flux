import React from "react";
import logo from "/favicon.svg";
import { Sparkles, MessageSquarePlus } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-1 md:px-6">
      <div className="max-w-lg text-center">
        {/* Logo */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-100 dark:bg-neutral-900 shadow-sm">
          <img src={logo} alt="FluxAI" className="h-10 w-10" />
        </div>

        {/* Heading */}
        <h1 className="mt-6     
                    text-3xl     
                    font-extrabold           
                    bg-gradient-to-r
                    from-neutral-900
                    to-neutral-500
                    dark:from-neutral-800/50
                    dark:to-neutral-600
                    bg-clip-text
                    text-transparent
                    ">
          Welcome to Flux.ai
        </h1>

        <p className="mt-6 text-sm  font-medium leading-6 text-neutral-600 dark:text-neutral-300">
            What’s on the agenda today?
        </p>

      </div>
    </div>
  );
};

const Suggestion = ({ icon, title, description }) => {
  return (
    <div
      className="
        flex items-start gap-4 rounded-xl border
        border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        p-4 transition-all duration-200
        hover:border-neutral-300 dark:hover:border-neutral-700
        hover:shadow-sm
      "
    >
      <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
        {icon}
      </div>

      <div className="text-left">
        <h3 className="font-medium text-neutral-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;