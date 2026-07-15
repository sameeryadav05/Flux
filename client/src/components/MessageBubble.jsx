import React from "react";
import logo from "/favicon.svg";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { FiUser } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";

const MessageBubble = ({ role, content, isThinking }) => {
  const isUser = role === "user";

    const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      className={`flex w-full mb-8 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start gap-3 w-full ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`
            shrink-0
            size-9
            rounded-full
            flex
            items-center
            justify-center
            mt-1

            ${
              isUser
                ? `
                    bg-neutral-900
                    text-white

                    dark:bg-white
                    dark:text-neutral-900
                  `
                : `
                    bg-violet-50
                    border
                    border-violet-100

                    dark:bg-violet-950/40
                    dark:border-transparent
                  `
            }
          `}
        >
          {isUser ? (
            <FiUser size={16} />
          ) : (
            <img
              src={logo}
              className="size-5"
              alt="FluxAI"
            />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`
            w-fit
            max-w-[90%]
            sm:max-w-[82%]
            lg:max-w-[75%]

            rounded-2xl
            px-6
            py-5

            overflow-hidden
            transition-all

            ${
              isUser
                ? `
                    bg-neutral-900
                    text-white
                    rounded-br-md

                    dark:bg-white
                    dark:text-neutral-900
                  `
                : `
                    bg-[#fafafa]
                    text-neutral-800

                    border
                    border-neutral-200

                    shadow-[0_2px_20px_rgba(0,0,0,0.05)]

                    rounded-bl-md

                    dark:bg-neutral-900
                    dark:text-neutral-100
                    dark:border-neutral-800
                    dark:shadow-none
                  `
            }
          `}
        >
          {isThinking && !isUser && !content ? (
            <ThinkingAnimation />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-5">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3">
                    {children}
                  </h3>
                ),

                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold mt-5 mb-3">
                    {children}
                  </h4>
                ),

                p: ({ children }) => (
                  <p className="leading-8 text-[15px] mb-5">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 mb-5">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 mb-5">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="leading-7">
                    {children}
                  </li>
                ),

                hr: () => (
                  <hr className="my-6 border-neutral-300 dark:border-neutral-700" />
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-600 dark:text-violet-400 underline hover:opacity-80"
                  >
                    {children}
                  </a>
                ),

                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-xl border border-neutral-300 dark:border-neutral-700">
                    <table className="min-w-full text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-neutral-100 dark:bg-neutral-800">
                    {children}
                  </thead>
                ),

                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-semibold border-b border-neutral-300 dark:border-neutral-700">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                    {children}
                  </td>
                ),

                blockquote: ({ children }) => (
                  <blockquote
                    className="
                      my-2
                      border-l-4
                      border-violet-500
                      bg-violet-50
                      dark:bg-violet-950/20
                      rounded-r-lg
                      pl-2
                      py-2
                      italic
                    "
                  >
                    {children}
                  </blockquote>
                ),

                code({ inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || "");

                  if (!inline && match) {
                    return (
                      <div className="my-6 overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-700">
                        <SyntaxHighlighter
                          language={match[1]}
                          style={theme === "dark" ? oneDark : oneLight}
                          customStyle={{
                            margin: 0,
                            padding: 12,
                            borderRadius: 0,
                            fontSize: 14,
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="
                        px-1.5
                        py-1
                        rounded-md
                        text-[14px]
                        font-mono

                        bg-neutral-200
                        text-pink-600

                        dark:bg-neutral-800
                        dark:text-violet-300
                      "
                    >
                      {children}
                    </code>
                  );
                },

                strong: ({ children }) => (
                  <strong className="font-semibold">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic">
                    {children}
                  </em>
                ),

                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-xl my-5 max-w-full border border-neutral-200 dark:border-neutral-700"
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

function ThinkingAnimation() {
  return (
    <div className="flex items-center gap-2 py-2">
      <FaCircle className="text-[7px] animate-bounce text-violet-500" />
      <FaCircle
        className="text-[7px] animate-bounce text-violet-500"
        style={{ animationDelay: ".15s" }}
      />
      <FaCircle
        className="text-[7px] animate-bounce text-violet-500"
        style={{ animationDelay: ".3s" }}
      />
    </div>
  );
}