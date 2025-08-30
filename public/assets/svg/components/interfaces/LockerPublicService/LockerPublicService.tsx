import './index.css'
import StateComponent from '../StateComponent/StateComponent'
import GoTo from '@/components/logics/GoTo'
import {useServiceAuth} from '@/components/stores/storeServicios';
type locker = {
    imgServicio:string,
    nameServicio:string,
    stateServicio:boolean,
    fechaServicio:string,
    dataFalse:string,
    dataTrue:string,
    entranceObject?:boolean,
    url?:string,
    id? : string
}
const LockerPublicService = ({imgServicio,nameServicio,stateServicio,url,fechaServicio,dataFalse,dataTrue,entranceObject,id}:locker)=>{
    const {setServices} = useServiceAuth()
    const statePackages = imgServicio == '/assets/svg/sign-in-bold.svg' ? 'enter':'exit'
    const stylePackagesIcon = entranceObject?`container_serviceLocker_iconService_packages ${statePackages}`:'container_serviceLocker_iconService'
    const goToPath = GoTo()
    const type = statePackages== 'enter' ? 'entrance':'output'
    const goToObject = ()=>{
        if(entranceObject){
                goToPath({path:url || ''})
                id? localStorage.setItem('idLocker',id):'';
        }else{
            goToPath({path:url || ''})
            setServices({
                    servicio: nameServicio,
                    state:stateServicio,
                    imgSrcServices: imgServicio,
                    date:fechaServicio
            })
        }
    }
    return(
        <div className='container_serviceLocker' onClick={goToObject}>
            <div className='container_serviceLocker_info'>
                <div className={stylePackagesIcon}>
                    <img src={imgServicio} className='container_serviceLocker_info_img' alt="Icono del servicio" />
                </div>
                { entranceObject?
                        <div className='container_serviceLocker_info_type'>
                             <p className='container_serviceLocker_info_paragraphe'>{nameServicio}</p>
                             <p className={`container_serviceLocker_info_type_${statePackages}`}>
                                {statePackages== 'enter' ? 'Entrada':'Salida'}
                             </p>
                        </div>
                    :
                    <p className='container_serviceLocker_info_paragraphe'>{nameServicio}</p>
                
                }
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