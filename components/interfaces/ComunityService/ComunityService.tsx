'use client'
import './index.css'
import GoTo from '@/components/logics/GoTo'
const ComunityService = ({imgServicio,nameServicio,precioServicio}:{precioServicio:string,imgServicio:string,nameServicio:string})=>{
    const goToPath = GoTo()
    const verProducto=()=>{
        goToPath({path:'/resident/mi-hogar/mis-servicios/tienda/productos/tienda-producto/'})
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
            <img src="/assets/svg/arrowIcon.svg" className='container_servicio_btn' alt="Icono de dirigir al servicio" onClick={verProducto}/>
        </div>
    )
}
export default ComunityService