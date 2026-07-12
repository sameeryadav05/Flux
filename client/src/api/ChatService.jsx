import { useMutation, useQuery } from '@tanstack/react-query';
import API from './Axios';

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await API.get("/chat/create-conversation");
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
            const res = await API.get('/chat/get-conversation')
            return res.data
        },
        refetchOnReconnect:true,
    })
    return query;
}