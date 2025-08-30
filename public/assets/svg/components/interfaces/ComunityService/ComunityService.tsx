'use client'
import './index.css'
import { GrNext } from "react-icons/gr";
import GoTo from '@/components/logics/GoTo'
import StateComponent from '../StateComponent/StateComponent';
const ComunityService = ({imgServicio,nameServicio,precioServicio,idChat,pathService,idService,stateService,nameChatService,activeState}:{precioServicio:string | number,imgServicio:string,nameServicio:string,pathService:string,idService:string,stateService?:boolean,activeState ?:boolean,idChat?:string,nameChatService?:string})=>{
    const goToPath = GoTo()
    const viewService=()=>{
        localStorage.setItem('idServiceCommunity',idService)
        if(idChat){
            localStorage.setItem('idChatService',idChat)
        }
        if(nameChatService)
        localStorage.setItem('nameChatService',nameChatService)
        goToPath({path:pathService})
    }
    const formatoMoneda = new Intl.NumberFormat('es-ES', {});
    return(
        <div className='container_servicio' >
            <div className='container_servicio_img'>
                <img src={imgServicio}  alt="Foto del servicio" />
            </div>
            <div className='container_servicio_info'>
                <p className='container_servicio_paragraphe'>{nameServicio}</p>
                <p className='container_servicio_precio'>Desde ${formatoMoneda.format(Number(precioServicio))}</p>
            </div>

            {
                activeState ? 
                <div className='container_servicio_info_send'>
                <StateComponent
                    statusComp = {stateService}
                    dataFalse='No aprob.'
                    dataTrue='Aprobado'
                />
                <button className='container_servicio_btn' onClick={viewService}><span><GrNext></GrNext></span></button>
                </div>:
                <button className='container_servicio_btn' onClick={viewService}><span><GrNext></GrNext></span></button>

            }
            {/* <img src="/assets/svg/arrowIcon.svg" className='container_servicio_btn' alt="Icono de dirigir al servicio" onClick={verProducto}/> */}
        </div>
    )
}
export default ComunityService