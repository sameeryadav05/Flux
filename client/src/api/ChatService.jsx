import { useMutation, useQuery } from '@tanstack/react-query';
import API from './Axios';
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { toast ,Bounce } from 'react-toastify';

export const useCreateConversation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      console.log("create conversation");
      const res = await API.post("/chat/create-conversation");
      return res.data;
    },

    onSuccess: (data) => {
        console.log("create Conversation data",data);
        navigate(`${data._id}`,{replace:true})
        queryClient.invalidateQueries({
        queryKey: ["all", "conversation"],
      });
    },

    onError:(error)=>{
        console.log("create conversation error",error);
    }

  });
};

export const useChat = ()=>{
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn:async ({ prompt, conversationId })=>{
          const {data} = await API.post('/agent/chat',{prompt,conversationId})
          return data;
        },

        onSuccess:(newdata,variables)=>{
          console.log("Ai Response",newdata);
          queryClient.setQueryData(["messages",variables.conversationId],(oldData=[])=>{
            return [
              ...oldData,
              newdata.userMessage,
              newdata.assistantMessage
            ]
          })
        },

        onError:(error)=>{
          console.log("Ai Response Error",error);
            return toast.error(error.response?.data?.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
      })
} 

export const useGetConversation = ()=>{
    const query = useQuery({
        queryKey:['all','conversation'],
        queryFn:async ()=>{
          console.log("get conversation");
            const res = await API.get('/chat/get-conversation')
            return res.data
        },
        staleTime:5*60*1000,
        enabled:true,
        refetchOnReconnect:true,
    })
    return query;
}

export const useGetMessages = (conversationId)=>{
  const query = useQuery({
    queryKey:["messages",conversationId],
    queryFn:async()=>{
      const{data} = await API.get(`/chat/getMessage/${conversationId}`)
      return data
    },
    enabled: !!conversationId,
    staleTime: 2 * 60 * 1000,
  })

  return query;
}

export const useLogout = ()=>{
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const query = useQuery({
    queryKey:["logout"],
    queryFn: async ()=>{
      const {data} = await API.get('/auth/logout')
      return data;
    },
    enabled:false,
  })
  if(query.isSuccess)
  {
    navigate('/auth',{replace:true})
    queryClient.invalidateQueries()
  }
  return query;
}

