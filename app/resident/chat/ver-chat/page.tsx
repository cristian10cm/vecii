'use client'
import { useEffect, useState } from 'react'
import './index.css'
import Chats from '@/components/interfaces/Chats/Chat'
import NoApiData from '@/components/interfaces/NoApiData/NoApiData'
const VerChat = ()=>{
    const [id,setId] = useState<string>()
    useEffect(()=>{
            const idChat = localStorage.getItem('idCurrentChat')
            if(!idChat) return
            setId(idChat)
    },[id])
    return(
           <>
            { id ? 
            <div className='container_chat_selected'>
                <Chats idChat={id} goToBack= {true}/>
            </div>
            :
            <NoApiData message='Cargando Chat'/>}

           </>
    )
}
export default VerChat