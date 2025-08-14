'use client'
import './index.css'

import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient'
import { setHousing } from '@/components/stores/StoreHousing'
import { use, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import NoApiData from '../NoApiData/NoApiData'
type ChatType = {
    createdAt: string,
    id: string,
    content: string,
    sender: {
            id: string,
            email: string
        }
}

const Chats = ({idChat,nameChat}:{idChat:string,nameChat?:string})=>{
    const myId = setHousing().information?.id
    const [useChat,setChat] = useState<ChatType[]>([])
    const [useIdChat,setIdChat] = useState<string>('') 
    const inputRef= useRef<HTMLInputElement>(null!!)
    const scrollRef = useRef<HTMLDivElement>(null)
    
    const token = Cookies.get('token')
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
            console.log(id)
            console.log(token)
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
        try{
                const send = await axios.post(`https://api.vecii.com.co/api/v1/chats/${useIdChat}/messages`,
                    {
                          "content":inputRef.current.value
                    },{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                )
                    getChat(useIdChat)
                    inputRef.current.value = ''

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "auto" }) 
    }
    },[useChat])
    useEffect(()=>{
        // const idChat = localStorage.getItem('idChatService')
        if(!idChat) return
        setIdChat(idChat)
        getChat(idChat)
    },[])
    return(
        <div className='container_chats'>
                <div className='container_chats_info'>
                    <div className='container_chats_info_img'>
                        <img src="https://img.freepik.com/vector-gratis/vector-monocromo-coleccion-barberia-herramientas_1441-138.jpg"  />
                    </div>
                  <p className='container_chats_info_paragraphe'>Sin nombre</p>
                </div>
                <div className='container_chats_gridConversation'>

                    {  useChat ? 
                     
                        useChat.map((x,k)=>{
                          if(myId === x.sender.id){
                            return <div key={k} className='container_chats_messages_mine'>
                                        <div className='container_chats_messages-message_mine'>
                                            <p className='container_chats_messages-message_text'>{x.content}</p>
                                        </div>
                                        <p className='container_chats_messages-message_time'>{changeTime(x.createdAt)}</p>
                                    </div>
                          }else{
                            return  <div key={k} className='container_chats_messages_transmitter'>
                                        <div className='container_chats_messages-message_transmitter'>
                                            <p className='container_chats_messages-message_text'>{x.content}</p>
                                        </div>
                                    <p className='container_chats_messages-message_time'>{changeTime(x.createdAt)}</p>
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

                    <button className='container_chats_sendMessage_btn' onClick={()=>sendMessage()}>
                        <IconSvgGradient
                            urlImage='/assets/svg//plus-circle-fill.svg'
                            widthImg='10vw'
                        />
                    </button>
                    <div className='container_chats_sendMessage_input' >
                        <input ref={inputRef} type="text"  placeholder='¡Envia un mensaje!'/>
                    </div>
                </div>
            </div>

    )
}
export default Chats