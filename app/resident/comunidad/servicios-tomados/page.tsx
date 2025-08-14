'use client'
import './index.css'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg'
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma'
import { use, useEffect, useRef, useState } from 'react'
import Chats from '@/components/interfaces/Chats/Chat'

const ServiciosTomados = () => {
    const [useId,setId] = useState<string>()
    const [useName,setName] = useState<string>()
    useEffect(()=>{
        const idChat = localStorage.getItem('idChatService')
        const name = localStorage.getItem('nameChatService')
        if(!idChat) return
        setId(idChat)
        if(!name) return
        setName(name)
    },[useId,useName])
    return (
        <>
            <VeciiHeaderImg
                srcImg='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                name='Comunidad'
                detail='Conjunto nombre'
            />
           
            {   useId? 
                <Chats
                // nameChat = {useName || 'Cargando..'}
                idChat={useId}
                />:''
                
            }
            <FooterFantasma />
        </>
    )
}

export default ServiciosTomados
