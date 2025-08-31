'use client'
import { useEffect, useState } from 'react'
import './index.css'
import Chats from '@/components/interfaces/Chats/Chat'
import NoApiData from '@/components/interfaces/NoApiData/NoApiData'
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const VerChat = ()=>{
    const [id,setId] = useState<string>()
    const [useNameChat,setName] = useState<string>()
    useEffect(()=>{
            const idChat = localStorage.getItem('idChatSelected')
            if(!idChat) return
            setId(idChat)
            const nameChat = localStorage.getItem('nameChatSelected')
            if(!nameChat) return
            setName(nameChat)

    },[id])
    return(
           <>
            { id ? 
            <div className='container_chat_selected'>
                <Chats idChat={id} nameChat={useNameChat} goToBack= {true}/>
            </div>
            :
            <NoApiData message='Cargando Chat'/>}
            <FooterFantasma/>
           </>
    )
}
export default VerChat