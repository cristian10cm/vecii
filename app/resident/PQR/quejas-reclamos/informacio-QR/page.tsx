'use client'
import './index.css'
import { useEffect,useState } from 'react'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import axios from 'axios';
import Cookies from 'js-cookie';
import { dataPQR,logs } from '.';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const informationPQR = ()=>{
    const [useNamePQR,setNamePQR] = useState<string>("")
    const [useIdPQR,setIdPQR] = useState<string>("")
    const [useStatus,setStatus] = useState<string>("")
    const [useData,setData] = useState<dataPQR>()
    const [useLogs,setLogs] = useState<logs>()
    const peticionPQR = async (idPQR:string)=>{
        try{
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/pqr/${idPQR}`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            })
            const data = await peticion.data
            console.log(data)
            setData(data)
        }catch(error){
            console.log(error)

        }
    }
    const peticionLogs = async(idPQR:string)=>{
        try{
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/pqr/${idPQR}/logs`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            })
            const data = await peticion.data.results
            console.log(data[0])
            setLogs(data[0])
        }catch(error){
            console.log(error)

        }
    }
    useEffect(()=>{
        const namePQR = localStorage.getItem('idNamePQR')
        const idPQR = localStorage.getItem('idPQRselected') 
        const statusPQR = localStorage.getItem('statusPQR')
        if(idPQR){ 
            setIdPQR(idPQR)
            peticionPQR(idPQR)
            peticionLogs(idPQR)
        }
        if(namePQR) setNamePQR(namePQR)
            if(statusPQR) setStatus(statusPQR)
         if(!useData) return
        if(!useLogs) return
        
    },[])
    return(
        <>
        <VeciiHeader
            srcImg='/assets/svg/mis servicios.svg'
            transparent={false}
            name={useNamePQR}
        />
            <div className='container_grid_PQRSelected'>
                <p className='container_grid_PQRSelected_title'>Información {useNamePQR}</p>
                <div className='container_grid_PQRSelected_items'>
                    <div className='container_grid_PQRSelected_info'>
                        <p className='container_grid_PQRSelected_subject'>{useData?.subject || 'Cargando..'}</p>
                         <p className='container_grid_PQRSelected_caseNumber'>{useData?.caseNumber || 'Cargando..'}</p>
                        
                </div>
                <div className='container_grid_PQRSelected_separator'></div>
                <div className='container_grid_PQRSelected_case'>
                         <p className='container_grid_PQRSelected_date'>{useData?.createdAt.split('T')[0]}</p>
                        <p className='container_grid_PQRSelected_description'>{useData?.description}</p>
                </div>
                <div className='container_grid_PQRSelected_separator'></div>
                <div className='container_grid_PQRSelected_history'>
                    <p className='container_grid_PQRSelected_history_title'>Historico del caso</p>
                    <div className='container_grid_PQRSelected_history_admin'>
                        <p className='container_grid_PQRSelected_history_user'>Administración</p>
                        <div className='container_grid_PQRSelected_history_state'>
                            <span className='container_grid_PQRSelected_history_span'></span>
                            <p>{useStatus}</p>
                        </div>
                    </div>
                    <p className='container_grid_PQRSelected_history_comments'>{useLogs?.comments || 'Sin historico.'}</p>

                </div>
            </div>
            </div>
   <FooterFantasma/>
        </>
    )

} 
export default informationPQR