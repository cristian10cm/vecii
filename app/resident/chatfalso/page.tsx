'use client'
import ChatsFalso from "@/components/interfaces/chatFalsooo/chatFalsooo";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useWebSocket from "@/components/interfaces/chatFalsooo/useSocket";
const chatFalsooo = ()=>{
    const [image,setFile] = useState<File | null>(null)
    const formData = new FormData()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

  };
    const {useNotification} = useWebSocket('ebac4b12-ee37-4b3f-9e26-6bc9e4b57b04')
    const peticion = async ()=>{
            if (!image) {
                console.log("Selecciona una imagen");
            return;
    }
        const formData = new FormData();
         formData.append('imagen', image);
        try{
            const peticion = await axios.post(`https://api.vecii.com.co/api/v1/complex-announcements/{id}/attach-background`,formData,{
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`,
                "Content-Type": "multipart/form-data",
            }
        })
            console.log(peticion.data)
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        if(!useNotification) return
        console.log(useNotification)
    },[useNotification])
    return(

        <>
            <ChatsFalso idChat="ebac4b12-ee37-4b3f-9e26-6bc9e4b57b04"/>
            
             {/* <input type="file" accept="image/*" onChange={handleFileChange}/>
             <button onClick={peticion}>eviar</button> */}
             {
                <p>{}</p>}
        </>

    )
}
export default chatFalsooo