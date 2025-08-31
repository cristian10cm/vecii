'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import OptionChat from '@/components/interfaces/OptionChat/OptionChat';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import axios from 'axios';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
type typeChat = {
createdAt: string
description: string
id: string
name: (string)
type: string
}
const Chat = () => {
    const {setInformation,barInformation} = useSearchBar()
    const [useData,setData] = useState<typeChat[]>([])
    const [seeMore,setMore] = useState<boolean>(false)
    const getChats = async()=>{
        try{
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/chats`, {
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            })
            setData(peticion.data)
        }catch(err){
          console.log(err)
        }
    }
    useEffect(()=>{
          setInformation({
            inputValue: ''
          })
          getChats()
    },[])
    // function changeName<typeChat>(data:typeChat[], key :keyof typeChat ){
    //     const nameSplit  = key.toString().split('-')[0]
    //     const 
    //     return nameSplit as keyof typeChat
    // }
    const dataChat = apiDataFilter(useData,'name',seeMore,barInformation?.inputValue || '' )
    return (
        <>
            <VeciiHeaderImg
                srcImg='https://images.unsplash.com/photo-1570101945621-945409a6370f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                name='Chat'
                detail='Comunicate fácil y rápido'
            />
            <SearchBar
                placeholder=''
            />
            <div className='container_chat_conversation'> 
                    {
                        useData.length>0 ? 
                            dataChat.filterData.length >0?
                            <>
                                {
                                    dataChat.filterData.map((x,k)=>(
                                        <OptionChat
                                             imgChat ={'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'}
                                             nameChat ={x.name.split(' -')[0] || 'Cargando'}
                                             key={k}
                                             idChat={x.id}
                                        />
                                ))
                                }
                                { dataChat.stateSeeMore ? <BtnSeeMore  enable={()=>setMore(true)} />:'' }
                            </>    
                            
                            :
                            <OptionChat
                                             imgChat ={'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'}
                                             nameChat ={'No encontrado'}
                                             idChat=''
                            />
                            
                            :
                            <NoApiData message='¡No tienes chats disponibles en este momento Vecii!'/>
                    }
            </div>

    <FooterFantasma/>

        </>
    );
};

export default Chat