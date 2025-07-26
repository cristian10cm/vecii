'use client'
import './index.css';
import {useServiceAuth} from '@/components/stores/storeServicios'
import GoTo from '@/components/logics/GoTo';
import StateComponent from '@/components/interfaces/StateComponent/StateComponent'
const PublicService = ({imgSrc,nameService,precieService,stateService,  date,pathUrl}: {imgSrc: string;nameService: string;precieService: string;stateService: boolean;date: string; pathUrl:string
})=>{
        const {setServices} = useServiceAuth() 
        const goToPath = GoTo();
        
        const payServices = ()=>{
            setServices({
                servicio: nameService,
                pagado:stateService,
                imgSrcServices: imgSrc
            });
            goToPath({path:pathUrl})
        }
        return(
          
            <div className='containerServiceMailBox' onClick={payServices}>
                    <div className='containerServiceMailBox_containerImg'>
                        <img className='containerServiceMailBox_img' src={imgSrc}/>
                    </div>
                    <div className='containerServiceMailBox_itemsInfo'>
                        <p className='containerServiceMailBox_paragraph'>{nameService}</p>
                        <p className={stateService?'containerServiceMailBox_precieTrue':'containerServiceMailBox_precieFalse'}>${precieService}</p>
                    </div>
                    <div className='containerServiceMailBox_itemsServiceState'>
                        <StateComponent
                            statusComp={stateService}  
                            dataTrue="Pagado"
                            dataFalse="Sin pagar"
                        />
                        <p className='containerServiceMailBox_date'>{date}</p>
                    </div>
            </div>
        )

}
export default PublicService