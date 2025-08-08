import './index.css'
import StateComponent from '../StateComponent/StateComponent'
const LockerPublicService = ({imgServicio,nameServicio,stateServicio,fechaServicio,dataFalse,dataTrue}:{imgServicio:string,nameServicio:string,stateServicio:boolean,fechaServicio:string,dataFalse:string,dataTrue:string})=>{
    return(
        <div className='container_serviceLocker'>
            <div className='container_serviceLocker_info'>
                <div className='container_serviceLocker_iconService'>
                    <img src={imgServicio} className='container_serviceLocker_info_img' alt="Icono del servicio" />
                </div>
                <p className='container_serviceLocker_info_paragraphe'>{nameServicio}</p>
            </div>
            <div className='container_serviceLocker_state'>
                <StateComponent
                    dataFalse={dataFalse}
                    dataTrue={dataTrue}
                    statusComp = {stateServicio}
                />
                <p className='container_serviceLocker_date'>{fechaServicio}</p>
            </div>
        </div>
    )
}
export default LockerPublicService