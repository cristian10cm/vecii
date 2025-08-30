'use client'
import './index.css'
import useWebSocket from './useWebSocket'
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient'
import { setHousing } from '@/components/stores/StoreHousing'
import { use, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
type Message =  {
  message: string;
  id?: string;
  sender: string,
  chatId?: string;
  createdAt?: string;
}
type ChatType = {
    createdAt: string,
    id: string,
    content: string,
    sender: {
            id: string,
            email: string
        }
} 
const Chats = ({idChat,nameChat,goToBack}:{idChat:string,nameChat?:string,goToBack?:boolean})=>{
    const email = setHousing().information?.email
    const [useChat,setChat] = useState<ChatType[]>([])
    const [useIdChat,setIdChat] = useState<string>('') 
    const inputRef= useRef<HTMLInputElement>(null!!)
    const scrollRef = useRef<HTMLDivElement>(null)
    const  {status,useMessage,useNotification,newMessage} = useWebSocket(useIdChat)
    
    const name = localStorage.getItem('nameChatService')
    const token = Cookies.get('token')
    const verifyHistory = () => history.back()
    const toMessage = (data:ChatType):Message=>{
            return{
                id: data.id,
                message:data.content,
                sender: data.sender.email, 
                chatId: undefined, 
                createdAt: data.createdAt
            }
    }
    const getChat = async(id:string)=>{
        try{    
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/chats/${id}/messages`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }

            })
            const {data} = await peticion
            setChat(data)

        }catch(err){
                console.log(err)
        }
    }
    const changeTime = (time:string)=>{
        const newTime = new Date(time)
        return newTime.toString().split(' ')[4].split(':').slice(0,2).join(':')
    } 
    const sendMessage =async ()=>{
        if(inputRef.current.value  === ''){
            return
        }
            newMessage(inputRef.current.value)
            inputRef.current.value = ''
    }

    useEffect(()=>{
        if(!idChat) return
        getChat(idChat)
        setIdChat(idChat)
    },[])
   const chatMessages= useChat.map(toMessage)
   const currentChat = [...chatMessages,...(useMessage || [])]  
    useEffect(()=>{
        
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "auto" }) 
    }
    },[currentChat])
    const styleHeader = goToBack ? 'container_chats_info_back' :'container_chats_info'
    return(
        <div className='container_chats'>
                <div className={styleHeader}>
                    {goToBack ? 
                        <button onClick={verifyHistory} className='container_chats_info_back_btn'>
                            <img src="/assets/svg/arrow-left.svg" alt="Regresar" className='container_chats_info_back_img' />
                        </button> : ''
                    }                     
                    <div className={ goToBack ?`container_chats_info_img_back`:'container_chats_info_img'}>
                        <img src="https://img.freepik.com/vector-gratis/vector-monocromo-coleccion-barberia-herramientas_1441-138.jpg"  />
                    </div>
                  <p className='container_chats_info_paragraphe'>{name}</p>
                </div>
                <div className='container_chats_gridConversation'>
                    
                    {   currentChat? 
                     
                        currentChat.map((x,k)=>{
                          if(x.sender== email){
                            return <div key={k} className='container_chats_messages_mine'>
                                        <div className='container_chats_messages-message_mine'>
                                            <p className='container_chats_messages-message_text'>{x.message}</p>
                                        </div>
                                        <p className='container_chats_messages-message_time'>{changeTime(x.createdAt || '')}</p>
                                    </div>
                          }else{
                            return  <div key={k} className='container_chats_messages_transmitter'>
                                        <div className='container_chats_messages-message_transmitter'>
                                            <p className='container_chats_messages-message_text'>{x.message}</p>
                                        </div>
                                    <p className='container_chats_messages-message_time'>{changeTime(x.createdAt || '')}</p>
                                    </div>
                          }
                        }):
                         
                        <div  className='container_chats_messages_transmitter'>
                                <div className='container_chats_messages-message_transmitter'>
                                            <p className='container_chats_messages-message_text'>Cargando..</p>
                                </div>
                            <p className='container_chats_messages-message_time'></p>
                        </div>
                        
                        }
                        <div ref={scrollRef}></div>
                </div>
                <div className='container_chats_sendMessage'>
                    <div className='container_chats_sendMessage_input' >
                        <input ref={inputRef} type="text"  placeholder='¡Envia un mensaje!'/>
                    </div>
                    
                    <button className='container_chats_sendMessage_btn' onClick={()=>sendMessage()}>
                        <IconSvgGradient
                            urlImage='/assets/svg//plus-circle-fill.svg'
                            widthImg='10vw'
                        />
                    </button>
                </div>
            </div>

    )
}
export default Chats