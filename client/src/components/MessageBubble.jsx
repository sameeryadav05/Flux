import React from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";
import logo from "/favicon.svg";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { FiUser } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  coy,
} from "react-syntax-highlighter/dist/esm/styles/prism";


import { useSelector } from "react-redux";

const MessageBubble = ({
  role,
  content,
  isThinking,
  images = [],
}) => {
  const isUser = role === "user";
  const theme = useSelector((state) => state.theme.mode);
  const [copiedCode, setCopiedCode] = useState("");

  const copyToClipboard = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);

    setTimeout(() => {
      setCopiedCode("");
    }, 2000);
  } catch (err) {
    console.error(err);
  }
};

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
            <>
              {/* Images */}

              {images.length > 0 && (
                <div
                  className={`
                    mb-6
                    grid
                    gap-3
                    ${
                      images.length === 1
                        ? "grid-cols-1"
                        : images.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-2 md:grid-cols-3"
                    }
                  `}
                >
                  {images.map((image, index) => (
                    <a
                      key={index}
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image}
                        alt={`Generated ${index + 1}`}
                        loading="lazy"
                        className="
                          w-full
                          rounded-xl
                          border
                          h-48
                          border-neutral-200
                          dark:border-neutral-700
                          object-cover
                          transition
                          duration-200
                          hover:scale-[1.02]
                          cursor-zoom-in
                          aspect-square
                        "
                      />
                    </a>
                  ))}
                </div>
              )}

              {/* Markdown */}

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
  const code = String(children).replace(/\n$/, "");

  if (!inline) {
    const isCopied = copiedCode === code;

    return (
      <div
        className="
          my-6
          overflow-hidden
          rounded-2xl
          border
          border-neutral-200
          dark:border-neutral-700
          bg-white
          dark:bg-neutral-900
          shadow-sm
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            px-4
            py-3
            border-b
            border-neutral-200
            dark:border-neutral-700

            bg-neutral-50
            dark:bg-neutral-800
          "
        >
          {/* Language */}
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                items-center
                gap-2

                px-3
                py-1

                rounded-lg

                bg-neutral-200
                dark:bg-neutral-700
              "
            >
              <span className="font-mono text-sm text-neutral-600 dark:text-neutral-300">
                {"</>"}
              </span>

              <span
                className="
                  text-sm
                  font-medium
                  capitalize
                  text-neutral-700
                  dark:text-neutral-100
                "
              >
                {match?.[1] || "text"}
              </span>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => copyToClipboard(code)}
            className="
              flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-lg

              text-sm

              text-neutral-600
              dark:text-neutral-300

              hover:bg-neutral-200
              dark:hover:bg-neutral-700

              transition-all
              duration-200
            "
          >
            {isCopied ? (
              <>
                <FiCheck
                  className="text-green-500"
                  size={17}
                />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Copied
                </span>
              </>
            ) : (
              <>
                <FiCopy size={17} />
                <span className="hidden sm:inline">
                  Copy
                </span>
              </>
            )}
          </button>
        </div>

        {/* Code */}
        <SyntaxHighlighter
          language={match?.[1]}
          style={theme === "dark" ? oneDark : coy}
          PreTag="div"
          showLineNumbers
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: "18px",
            borderRadius: 0,
            fontSize: "14px",
            background: "transparent",
          }}
          lineNumberStyle={{
            color:
              theme === "dark"
                ? "#6b7280"
                : "#9ca3af",
            minWidth: "2.5em",
            userSelect: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code
      className="
        rounded-md
        px-1.5
        py-0.5

        font-mono
        text-[0.92em]

        bg-neutral-100
        text-rose-600

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
  <a
    href={src}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={src}
      alt={alt}
      className="
        w-full
        max-w-md
        h-72
        object-cover
        rounded-xl
        my-5
        border
        border-neutral-200
        dark:border-neutral-700
        cursor-zoom-in
        transition
        hover:scale-[1.02]
      "
    />
  </a>
),
              }}
              >
                {content}
              </ReactMarkdown>
            </>
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