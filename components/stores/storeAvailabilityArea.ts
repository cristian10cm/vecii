import {create} from 'zustand'
import { persist,createJSONStorage } from 'zustand/middleware'
export type dias = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export interface TimeRange {
  start?: string;
  end?: string;
}

export interface availability {
  availability: Partial<Record<dias, TimeRange>>;
}
type schedule = {
    daysAvailability : availability | null,
    setAvailability: (newAvailability: availability) => void
}
export const useAvailability = create<schedule>()(
    persist(
        (set)=>(
            {
                daysAvailability: null,
                setAvailability: (newAvailability: availability)=>set({daysAvailability:newAvailability})
            }
        ),
        {
            name:'daysAvailability',
            storage: createJSONStorage(()=>sessionStorage)

        }

    )
)
/*STORE PARA GUARDAR FECHA*/
export interface dateType{
    dateSelected : Date |   null
}
type dateCalendar = {
    dateCalendar: dateType | null,
    setDateCalendar: (newDateCalendar:dateType)=>void
}

export const useDateCalendar = create<dateCalendar>()(
    persist(
        (set)=>(
            {
                dateCalendar: null,
                setDateCalendar: (newDateCalendar:dateType)=>set({dateCalendar:newDateCalendar})
            }
        ),
        {
           name:'dateCalendar',
            storage: createJSONStorage(()=>sessionStorage)
        }
    )
)
/* STORE guardar HORAS DE RESERVA */
export type stateTime = 'start' | 'end'
export interface times {
    timesReserved:Partial<Record<stateTime,string>>
}
type timesReserved = {
    time: times | null
    setTimesReserved : (newTimesReserved: times)=>void
}
export const useTimeReserved = create<timesReserved>()(
   
    (set, get) => ({
      time: { timesReserved: {} },
      setTimesReserved: (newTimesReserved: times) =>
        set((state) => ({
          time: {
            timesReserved: {
              ...state.time?.timesReserved,
              ...newTimesReserved.timesReserved,
            },
          },
        })),
    })
)
/*Guardar los tiempos disponibles en el calendario*/

type timeAvalaible = {
    hours : times  | null;
    setHourAvalaible : (newHour:times) =>void 
} 
export const useHourAvalaible = create<timeAvalaible>()(
    (set)=>(
        {
            hours:null,
            setHourAvalaible : (newHour:times)=>set({hours:newHour})
        }
    )
)