import './index.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { data } from '@/components/stores/StoreHousing';
const ModalWindow = ({imgIcon,title,date,nameUser,code,stateBoton}:{stateBoton:boolean,imgIcon:string,title:string,date:string,nameUser:string,code:string})=>{
    const [useBoton,setBoton] = useState<boolean>(true);
    const [useData, setData] = useState<data>()
 
    useEffect(()=>{
        const peticionRes = async()=>{
                
               try{ 
                    const peticion = await axios.get('https://api.vecii.com.co/api/v1/auth/me',{
                    headers:{
                        'Authorization':`Bearer ${Cookies.get('token')}`
                    }}
                    )
                    setData(peticion.data)
              
        }catch(error){
       
                }
        }
        peticionRes()
    },[])
    return(
        <div className={useBoton?`container_modalWindow`:'container_modalWindow_close'}>
            <div className='container_modalWindow_ad'>

                    <img src={imgIcon} className='container_modalWindow_icon' alt="Icono modal" />
                    <p className='container_modalWindow_title'>{title}</p>
                    <div className='container_modalWindow_date'>
                        <p className='container_modalWindow_date-paragraphe'>Fecha de ingreso</p>
                        <p className='container_modalWindow_date-reserved'>{date}</p>
                    </div>
                    <div className='container_modalWindow_infoUser'>
                        <p className='container_modalWindow_infoUser-name'>{nameUser}</p>
                        <p className='container_modalWindow_infoUser-housing'>{useData?.location.unit.name} - {useData?.location.housing.name}</p>
                    </div>
                    <div className='container_modalWindow_codeReserved'>
                        <p className="container_modalWindow_codeReserved-title">Codigo de ingreso</p>
                        <p className="container_modalWindow_codeReserved-code">{code}</p>
                    </div>
                       <img className='container_modalWindow_closeModal' onClick={()=>setBoton(!stateBoton)} src='https://cdn-icons-png.flaticon.com/128/6785/6785304.png'/>
            </div>
        </div>
        
    )
}
export default ModalWindow