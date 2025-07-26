'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import OptionChat from '@/components/interfaces/OptionChat/OptionChat';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect } from 'react';

const Chat = () => {
    const information = useSearchBar(); 
    const {setInformation} = useSearchBar()
    useEffect(()=>{
          setInformation({
            inputValue: ''
          })
    },[])
    const chats = 
   [
    {
      "name": "Secretaria",
      "imgChat": "https://www.aprender21.com/images/colaboradores/secretaria.webp"
    },
    {
      "name": "Porteria",
      "imgChat": "https://caracol.com.co/resizer/v2/DL2VAS7H3RBVBK6R5PGRJBWSBQ.jpg?auth=aa8931566e7863085856b3febcca0b54915ec46705ba33b4a8ccba6d5d1161aa&width=650&height=488&quality=70&smart=true"
    },
    {
      "name": "Administración",
      "imgChat": "https://www.shutterstock.com/image-photo/st-petersburg-russia-july-17-600nw-2492719799.jpg"
    },
    {
      "name": "Tienda de verduras",
      "imgChat": "https://plazadepaloquemao.com/wp-content/uploads/2021/01/84012-1.jpg"
    }
  ]
    const data = chats.filter((e)=>e.name.toLowerCase().trim().includes((information?.information?.inputValue)?.toLocaleLowerCase().trim() || ''))
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
            <div className='container_chat'> 
                    { data.length > 0 ? 
                            data.map((info,k)=>(
                                    <OptionChat
                                        imgChat={info.imgChat}
                                        nameChat={info.name}
                                        key={k}                                    
                                    />
                            )):
                            <OptionChat
                                imgChat='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                                nameChat='No encontrado'
                            
                            />
                           

                    } 
            </div>


        
            <FooterFantasma/>
        </>
    );
};

export default Chat