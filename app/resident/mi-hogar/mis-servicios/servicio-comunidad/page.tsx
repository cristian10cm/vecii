'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

type CommunityService =  {
  createdAt: string;
  id: string;
  title: string;
  description: string;
  price: string;
  backgroundImage: string | null;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  images: string[]; // Si luego usas objetos en lugar de strings, se puede ajustar
}
const ServicioComunidad = ()=>{
    const [useService,setService] = useState<CommunityService>()
    const [useIdService,setIdService] = useState<string>()
    const [useBoton,setBoton] = useState<boolean>(true)
    const nombreAuthor = `${useService?.author.firstName.split(' ')[0]} ${useService?.author.lastName.split(' ')[0]}`
    const fecha = useService?.createdAt.split('T')[0]
    const requireService = async()=>{
        try{
            const requiere = await axios.post(`https://api.vecii.com.co/api/v1/community-services/${useIdService}/take`,
                {}
                ,{
                        headers:{
                            Authorization: `Bearer ${Cookies.get('token')}`
                        }
                }
            )
            console.log(requiere.data)
            toast.success('¡ Solicitud creada correctamente !')
            setBoton(false)
        }catch(err){
            console.log(useIdService)
            toast.error('Lo sentimos no se pudo solicitar el servicio.')
            console.log(err)
        }
    }
    useEffect(()=>{
          const idService = localStorage.getItem('idServiceCommunity')
        if(!idService) return
        setIdService(idService)
        const getService = async()=>{
            try{
                const peticion = await axios.get(`https://api.vecii.com.co/api/v1/community-services/${idService}`,
                    {
                        headers:{
                            Authorization: `Bearer ${Cookies.get('token')}`
                        }
                    }
                )
                setService(peticion.data)
            }catch(err){
                console.log(err)
        }
    }
    getService()
    },[])
    return( 
        <>
        <VeciiHeader
                srcImg='/assets/svg/mis servicios.svg'
                name='Mis Servicios'
                transparent = {false}
        />
        <div className='container_requestService'>
            <p className='container_requestService_title'>{useService?.title || 'Cargando..'} </p>
            <div className='container_requestService_separatorLine'></div>
            <img src="https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2FkbyUyMGRlJTIwZnJ1dGFzfGVufDB8fDB8fHww" className='container_requestService_img'  alt="Foto del servicio" />
            <div className='container_requestService_infoAuthor'>
                <p className='container_requestService_nameAuthor'>{nombreAuthor || 'Cargando..'} <span>{fecha || '00/00/00'}</span></p>
                <p className='container_requestService_precie'>Desde COP ${useService?.price || '0.00'}</p>
            </div>
            <div className='container_requestService_separatorLine'></div>
            <p className='container_requestService_description'>{useService?.description || 'Cargando..'}</p>
            <button className='container_requestService_btn'  onClick={()=>useBoton?requireService():''}>{useBoton?'Solicitar servicio':'¡Solicitud enviada!'}</button>
            
        </div>
        </>
    )
}

export default ServicioComunidad