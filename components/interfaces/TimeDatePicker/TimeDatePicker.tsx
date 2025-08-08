import './index.css'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { useTimeReserved,times,useAvailability,useHourAvalaible } from '@/components/stores/storeAvailabilityArea';
import { useEffect,useState } from 'react';
import { data } from '@/components/stores/StoreHousing';
const getMinTime = (minTime:string)=>{
     const time = new Date()
     const [hourExit,minuteExit] = (minTime.split(':').map(x=>parseFloat(x)))
     time.setHours(hourExit,minuteExit,0,0)
     return time

}
const getMaxTime = (maxTime:string)=>{
     const time = new Date()
     const [hourStart,minuteStart] = (maxTime.split(':').map(x=>parseFloat(x)))
     time.setHours(hourStart,minuteStart,0,0)
     return time

}
<input
    className="timePicker_reserved_areaComun"
    readOnly
    placeholder="Selecciona hora"
  />
const TimeDatePicker = ({typeTime}:{typeTime:'start' | 'end'})=>{
     const hours = useHourAvalaible()
    const information = useAvailability()
    const [horaMinima, setHoraMinima] = useState<Date | null>();
    const [horaMaxima, setHoraMaxima] = useState<Date | null>();
    const [useTime,setTime] = useState<Date | null>()
    const {setTimesReserved} = useTimeReserved()
    const getTime=(date:Date | null)=>{
          console.log(information.daysAvailability?.availability)
          setTime(date)
          if(date && typeTime){
                     setTimesReserved(
               {
                    timesReserved:{
                         [typeTime]:date
                    }
               }
          )
          }
     
    }
    useEffect(()=>{
          if(!hours.hours?.timesReserved) return
        const fechaInicio = hours.hours?.timesReserved.start
        const fechaSalida = hours.hours?.timesReserved.end
        
        if(fechaInicio && fechaSalida){
                setHoraMaxima(getMaxTime(fechaInicio))
             setHoraMinima(getMinTime(fechaSalida))
        }
     setTime(null);
     setTimesReserved({ timesReserved: {} })
    },[hours.hours?.timesReserved])
    return (

        <div>
              <DatePicker
      className="timePicker_reserved_areaComun"
       showTimeSelect
  showTimeSelectOnly
  onChange={(e)=>getTime(e)}
  wrapperClassName="timePicker_container"
  timeIntervals={60} 
  selected={useTime}
  minTime={horaMinima || undefined}
  maxTime={horaMaxima || undefined}
  placeholderText={''}

dateFormat="h:mm aa"
//   timeFormat="HH:mm"


   onKeyDown={(e) => e.preventDefault()}
   />
        </div>
    )
}
export default TimeDatePicker