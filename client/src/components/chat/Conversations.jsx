import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useGetConversation } from "../../api/ChatService";

const Conversations = () => {
  const { data, isLoading } = useGetConversation();
  const navigate = useNavigate();
  const {conversationId} = useParams()
  if (isLoading) {
    return (
      <div className="p-4 text-sm text-neutral-500 dark:text-neutral-400">
        Loading...
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="p-4 text-sm text-neutral-500 dark:text-neutral-400">
        No Recent Chats
      </div>
    );
  }

  return (
    <div
      className="
      h-full
      overflow-y-auto
      custom-scrollbar
      px-2
      pb-3
    "
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        {data?.map((conversation, index) => (
          <button
          onClick={()=>{
            navigate(`${conversation._id}`)
          }}
            key={conversation._id}
            className={`
              w-full
              mt-[3px]
              rounded-lg
              px-3
              py-2
              text-left
              transition

              ${
                conversation._id === conversationId
                  ? "bg-neutral-200 dark:bg-neutral-800"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }
            `}
          >
            <p
              className="
              truncate
              text-[14px]

              text-neutral-800
              dark:text-neutral-200
            "
            >
              {conversation.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Conversations;