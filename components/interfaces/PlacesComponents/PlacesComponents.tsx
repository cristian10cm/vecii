'use client'
import './index.css'
import StateComponent from '@/components/interfaces/StateComponent/StateComponent';
import GoTo from '@/components/logics/GoTo';
const PlacesComponents =({namePlace,statePlace,reservationTime,date,pathPlace}:{namePlace:string;statePlace:boolean;reservationTime:string;date:string,pathPlace: string})=>{
    const goToPath = GoTo()    
    return (
    <div className='container_places' onClick={()=>goToPath({path:pathPlace})}>
        <div className="container_places-info">
            <p className="container_places_namePlace">{namePlace}</p>
            <p className="container_places_timeReserved">Hora {reservationTime}</p>
        </div>
        <div className="container_places-status">
            <StateComponent
                statusComp={statePlace}
                dataTrue="Reservado"
                dataFalse="No Reservado" />
            <p className="container_places_date">{date}</p>
        </div>
    </div>)
}

export default PlacesComponents