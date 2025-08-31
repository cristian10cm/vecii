import './index.css'
import GoTo from '@/components/logics/GoTo'
import useWebSocket from '../Chats/useWebSocket'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { setHousing } from '@/components/stores/StoreHousing'
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
const OptionChat  = ({imgChat,idChat, nameChat}:{imgChat:string, nameChat:string,idChat:string})=>{
        const goToPath = GoTo()
        const [useId,setId] = useState<string>('')
        const [useChat,setChat] = useState<ChatType[]>([])
        const  {status,useMessage,useNotification} = useWebSocket(useId)
        const email = setHousing().information?.email
        const getChat = async(id:string)=>{
            try{    
                const peticion = await axios.get(`https://api.vecii.com.co/api/v1/chats/${id}/messages`,{
                    headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }

            })
                const {data} = await peticion
                setChat(data)

            }catch(err){
                console.log(err)
        }
    }
        const goToChat = ()=>{
            goToPath({path:'/resident/chat/ver-chat/'})
            localStorage.setItem('idChatSelected',idChat)
            localStorage.setItem('nameChatSelected',nameChat)
        } 
        useEffect(()=>{
            if(!idChat) return
            setId(idChat)
            getChat(idChat)
        },[])
        const messageUpdate = [...useChat,...(useMessage || [])]
        const lastmessage = messageUpdate.length>0 ?  messageUpdate[messageUpdate.length -1] : null
        const content = lastmessage ? (lastmessage as ChatType).content: ''
        const sender = lastmessage ? (lastmessage as ChatType).sender.email : ''
        return(
            <div className='container_optionChat'>
                    <div className='container_optionChat_img'>
                        <img src={imgChat}  alt="Foto de perfil" />
                    </div>
                    <div className='container_optionChat_info'>
                        <p className='container_optionChat_paragraphe'>{nameChat}</p>
                        <p className='container_optionChat_description'>{
                            sender === email ?
                            content: `${content}`
                        }</p>
                    </div>
                    <img src='/assets/svg/arrowIcon.svg' className='container_optionChat_btn' onClick={goToChat} />
            </div>
        )
}
export default OptionChat