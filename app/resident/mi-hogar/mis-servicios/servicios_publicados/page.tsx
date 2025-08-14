'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader'
import EditMyServices from '@/components/interfaces/EditMyServices/EditMyServices'
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma'
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
        <FooterFantasma/>
        
    </>
 )
}
export default ServiciosPublicados