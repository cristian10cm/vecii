'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader'
import EditMyServices from '@/components/interfaces/EditMyServices/EditMyServices'
const ServiciosPublicados = ()=>{
 return(
    <>
           <VeciiHeader
                srcImg='/assets/svg/mis servicios.svg'
                name='Mis Servicios'
                transparent={false}
            />
               <EditMyServices
        />
     
        
    </>
 )
}
export default ServiciosPublicados