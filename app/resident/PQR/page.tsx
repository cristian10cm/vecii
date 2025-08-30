'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import PQROption from '@/components/interfaces/PQROption/PQROption';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
type types = {
    createdAt: string,
    id: string,
    name: string,
    slug: string
}
const PQR = () =>{
    const [useTypes,setType] = useState<types[]>([])
    useEffect(()=>{
        const peticionTypeQpr= async()=>{
            const peticion =await axios.get('https://api.vecii.com.co/api/v1/pqr-type',
                {
                    headers:{
                        Authorization:`Bearer ${Cookies.get('token')}`
                     }
            }
            )
            const data = await peticion.data
            setType(data)
        }
        peticionTypeQpr()
        },[])
    return(
        <>
            <VeciiHeaderImg 
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8AnyLfZx3k_xAlg5BC8mmNdzQl3DlqhPOCDHeEtLN9zIE51pPQtg7xSeTNAkXJUQDN8&usqp=CAU'
                name='PQR'
                detail='Conjunto de madelena'
            />
            <div className='PQR_section'>
                
                <PQROption
                    bakground='https://cdn-icons-png.flaticon.com/512/18821/18821602.png'
                    title={useTypes[1]?.name || 'cargando...'}
                    idPQR={useTypes[1]?.id}
                    details='Encontrarás  un canal de información que te ayudará a responder tus inquietudes, Vecii.'
                    pathUrl='/resident/PQR/preguntas-PQR/'
                />
                <PQROption
                    bakground='https://cdn-icons-png.flaticon.com/512/1972/1972461.png'
                    idPQR={useTypes[0]?.id}
                    title={useTypes[0]?.name || 'cargando...'}
                    details='Atenderemos cualquier tipo de queja para poder mejorar nuestro servicio en el menor tiempo posible, Vecii..'
                    pathUrl='/resident/PQR/quejas-reclamos/'
                />
                <PQROption
                    idPQR={useTypes[2]?.id}
                    bakground='https://cdn-icons-png.flaticon.com/512/2891/2891237.png'
                    title={useTypes[2]?.name || 'cargando...'}
                    details='Déjanos tus reclamos y te daremos una solución.'
                    pathUrl='/resident/PQR/quejas-reclamos/'
                />
            </div>
        </>
    )


}

export default PQR