import API from "./Axios";
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { toast ,Bounce } from 'react-toastify';
import {Navigate} from 'react-router-dom'
import { useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
 
    const queryClient = useQueryClient();

    const LoginMutation = useMutation({
        mutationFn:async (token)=>{
            const result = await API.post('/auth/login',{token})
            return result.data;
        },

        onSuccess:async (data)=>{
            toast.success(data?.message, {
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

            await queryClient.invalidateQueries({
                queryKey:["auth","user"]
            })
        },

        onError:(error)=>{
            // console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message, {
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

    return LoginMutation;
    
}

export const useGetUserInfo = ()=>{
    const query = useQuery({
        queryKey:["auth","user"],
        queryFn:async ()=>{
            console.log("call /me");
            const result= await API.get('/me');
            return {user:result?.data?.user};
        },
        staleTime:5*60*1000, // 5 min
        gcTime:10*60*1000, //10 min
        retry:(failureCount,error)=>{
            if(error.response?.status === 401)
            {
                return false;
            }
            return failureCount<3;
        },
        refetchOnWindowFocus:false,
        refetchOnReconnect:true,
        refetchOnMount:false
    })

    return query;
}



