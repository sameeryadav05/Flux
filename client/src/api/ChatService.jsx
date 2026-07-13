import { useMutation, useQuery } from '@tanstack/react-query';
import API from './Axios';
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log("create conversation");
      const res = await API.post("/chat/create-conversation");
      return res.data;
    },

    onSuccess: (data) => {
        console.log("create Conversation data",data);
      queryClient.invalidateQueries({
        queryKey: ["all", "conversation"],
      });
    },

    onError:(error)=>{
        console.log("create conversation error",error);
    }

  });
};

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