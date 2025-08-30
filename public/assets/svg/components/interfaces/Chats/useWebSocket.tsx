'use client'
import Sockets from "@/components/stores/Sockets";
import { useState,useEffect } from "react";
interface Message {
  message: string;
  id?: string;
  sender: string,
  chatId?: string;
  createdAt?: string;
}

interface Notification {
  title: string;
  message: string;
  data?: any;
}
export default function useWebSocket(chatId:string){
    const [useMessage,setMessage] = useState<Message[]>([])
    const [useNotification,setNotification] = useState<Notification[]>([])
    const [status,setStatus] = useState<boolean>(false)
    useEffect(()=>{
        Sockets.connect()
        Sockets.on('connect',()=>{
            setStatus(true)
            if(chatId){
                Sockets.emit('join-chat',chatId)
            }
        })
        Sockets.on('disconnect',()=>{
            setStatus(false)
            console.log('Desconectado')
        })
        Sockets.on('notifications',(data:Notification)=>{
            setNotification((x)=>[...x,data]);
        })
        Sockets.on('new-message',(data:Message)=>{
            setMessage((x)=>[...x,data])
        })
        Sockets.on('new-chat',(data:{id:string})=>{
            Sockets.emit('join-chat',data.id)
        })
        return () => {
        Sockets.disconnect();
    };
    },[chatId])
    const newMessage = (message:string)=>{
        if(chatId){
            Sockets.emit('send-message',{message,chatId})
        }else{
            console.log('No se logro envíar el mensaje')
        }
    }
    return {
        status,
        useMessage,
        useNotification,
        newMessage
    }
}