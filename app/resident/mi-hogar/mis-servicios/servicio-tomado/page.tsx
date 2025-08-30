'use client'
import { useEffect, useState } from 'react'
import './index.css'
import Chats from '@/components/interfaces/Chats/Chat'
import NoApiData from '@/components/interfaces/NoApiData/NoApiData'
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';

const chatServicio = ()=>{
    const [id,setId] = useState<string>()
    const [useName,setName] = useState<string>()
    useEffect(()=>{
            const idChat = localStorage.getItem('idChatService')
            const name = localStorage.getItem('nameChatService')        
            if(!idChat) return
            setId(idChat)
            if(!name) return
            setName(name)
    },[id,useName])
    return(
           <>
            { id ? 
            <div className='container_chat_selected'>
                <Chats idChat={id} goToBack= {true} nameChat={useName} />
            </div>
            :
            <NoApiData message='Cargando Chat'/>}
            <FooterFantasma/>
           </>
    )
}
export default chatServicio