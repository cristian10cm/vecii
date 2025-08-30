'use client'
import socketFalsoo from "./socketFalsoo";
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
        socketFalsoo.connect()
        socketFalsoo.on('connect',()=>{
            setStatus(true)
            if(chatId){
                socketFalsoo.emit('join-chat',chatId)
            }
        })
        socketFalsoo.on('disconnect',()=>{
            setStatus(false)
            console.log('Desconectado')
        })
        socketFalsoo.on('notifications',(data:Notification)=>{
            setNotification((x)=>[...x,data]);
        })
        socketFalsoo.on('new-message',(data:Message)=>{
            setMessage((x)=>[...x,data])
        })
        socketFalsoo.on('new-chat',(data:{id:string})=>{
            socketFalsoo.emit('join-chat',data.id)
        })
        return () => {
        socketFalsoo.disconnect();
    };
    },[chatId])
    const newMessage = (message:string)=>{
        if(chatId){
            socketFalsoo.emit('send-message',{message,chatId})
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