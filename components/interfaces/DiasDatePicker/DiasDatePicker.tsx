'use client';

import './index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAvailability, dias,useDateCalendar,useHourAvalaible } from '@/components/stores/storeAvailabilityArea';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import { useEffect, useState } from 'react';
registerLocale('es', es);

type dayType = {
  indice: number;
};
type dayEnglis = {
  day:string
}
const days: Record<dias, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
const filterDays= ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const useDiasDisponibles = () => {
  const uptadeHour = useHourAvalaible()
  const [useFecha, setFecha] = useState<Date | null>();
  const [useToday,setToday] = useState<Date | null>();
  const daysAvailability = useAvailability().daysAvailability;
  const [useDay, setDay] = useState<dayType[]>();
  const {setDateCalendar} = useDateCalendar()
  const getDate = (date:Date  | null)=>{
        if(date ){
          const day = (filterDays[date?.getDay()]) as dias
          const hours = (daysAvailability?.availability[day])
          uptadeHour.setHourAvalaible(
            {
              timesReserved:{
                end: hours?.end,
                start:hours?.start
              }
            }
          )
          
        }
      setFecha(date)
      setDateCalendar({
        dateSelected:date
      })
  }
  useEffect(() => {
    if (!daysAvailability?.availability) return;
 console.log('dias:',daysAvailability.availability)
    const dayFilter = Object.entries(days)
      .filter(([dia]) => !!daysAvailability.availability?.[dia as dias])
      .map(([_, indice]) => ({ indice }));
    if (dayFilter) {
      setDay(dayFilter);
    }
    const today = new Date()
    setToday(today)
  }, [daysAvailability]);

  return (
    <div>
      <DatePicker
        selected={useFecha}
        onChange={(date) => getDate(date)}
        dateFormat="dd-MM-yyyy"
        placeholderText={useToday?.toISOString().split('T')[0] }
        wrapperClassName='datePicker_reserved_areaComun'
        locale="es"
        onKeyDown={(e) => e.preventDefault()}
        popperClassName="datePicker_reserved_areaComun_calendar"
        className='datePicker_reserved_areaComun_input'
         popperPlacement="bottom-start"
        filterDate={(date) => {
          const today = new Date()
          const diaSemana = date.getDay();
          return useDay ? useDay.some((element) => diaSemana === element.indice) && date> today : false;
        }}
        dayClassName={(date) => {
          const diaSemana = date.getDay();
          const today = new Date()
          date.toString() === today.toString() ? 'today':''
          if (useDay) {
            const estaDisponible = useDay.some((d) => d.indice === diaSemana)  && date>today ;
            return estaDisponible ? 'dia_disponible' : '';
          }
          return '';
        }}
      />
    </div>
  );
};

export default useDiasDisponibles;