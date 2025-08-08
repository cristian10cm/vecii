'use client'
import './index.css'
import { GrNext } from "react-icons/gr";
import GoTo from '@/components/logics/GoTo'
const ComunityService = ({imgServicio,nameServicio,precioServicio,pathService,idService}:{precioServicio:string | number,imgServicio:string,nameServicio:string,pathService:string,idService:string})=>{
    const goToPath = GoTo()
    const viewService=()=>{
        localStorage.setItem('idServiceCommunity',idService)
        goToPath({path:pathService})
    }
    return(
        <div className='container_servicio' >
            <div className='container_servicio_img'>
                <img src={imgServicio}  alt="Foto del servicio" />
            </div>
            <div className='container_servicio_info'>
                <p className='container_servicio_paragraphe'>⚡{nameServicio}</p>
                <p className='container_servicio_precio'>Desde COOP $ {precioServicio}</p>
            </div>
            <button className='container_servicio_btn' onClick={viewService}><span><GrNext></GrNext></span></button>
            {/* <img src="/assets/svg/arrowIcon.svg" className='container_servicio_btn' alt="Icono de dirigir al servicio" onClick={verProducto}/> */}
        </div>
    )
}
export default ComunityService