import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type dias = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export interface TimeRange {
  start?: string;
  end?: string;
}
export interface availability {
  availability: Partial<Record<dias, TimeRange>>;
}

/* STORE DISPONIBILIDAD */
type schedule = {
  daysAvailability : availability | null,
  setAvailability: (newAvailability: availability) => void,
  resetAvailability: () => void
}
export const useAvailability = create<schedule>()(
  persist(
    (set)=>( {
      daysAvailability: null,
      setAvailability: (newAvailability: availability)=>set({daysAvailability:newAvailability}),
      resetAvailability: ()=>{
        set({daysAvailability:null})
         useAvailability.persist.clearStorage()
      }
    }),
    {
      name:'daysAvailability',
      storage: createJSONStorage(()=>sessionStorage)
    }
  )
)

/* STORE FECHA */
export interface dateType{
  dateSelected : Date | null
}
type dateCalendar = {
  dateCalendar: dateType | null,
  setDateCalendar: (newDateCalendar:dateType)=>void,
  resetDateCalendar: ()=>void
}
export const useDateCalendar = create<dateCalendar>()(
  (set)=>( {
    dateCalendar: null,
    setDateCalendar: (newDateCalendar:dateType)=>set({dateCalendar:newDateCalendar}),
    resetDateCalendar: ()=>set({dateCalendar:null})
  })
)

/* STORE HORAS RESERVADAS */
export type stateTime = 'start' | 'end'
export interface times {
  timesReserved: Partial<Record<stateTime,string>>
}
// type timesReserved = {
//   time: times | null
//   setTimesReserved : (newTimesReserved: times)=>void
//   resetTimes: () => void 
// }
// export const useTimeReserved = create<timesReserved>()(
//   (set) => ({
//     time: null,
//     setTimesReserved: (newTimesReserved: times) =>
//       set((state) => ({
//         time: {
//           timesReserved: {
//             ...state.time?.timesReserved,
//             ...newTimesReserved.timesReserved,
//           },
//         },
//       })),
//     resetTimes: () => set({ time: null })
//   })
// )
/*HORA ENTRADA */
// export type stateTime = 'start' | 'end'
export interface timesStart {
  timesReservedStart: string | Date
}
type timesReservedStart = {
  time: timesStart | null
  setTimesReservedStart : (newTimesReserved: timesStart)=>void
  resetTimesStart: () => void,
}
export const useTimeReservedStart = create<timesReservedStart>()(
    (set)=>({
        time:null,
        setTimesReservedStart:(newTimesReserved: timesStart)=>set({time:newTimesReserved}),
        resetTimesStart:()=>set({time:null})
    })
)
/* hora salida */
export interface timesEnd {
  timesReservedEnd: string | Date
}
type timesReservedEnd = {
  time: timesEnd | null
  setTimesReservedEnd : (newTimesReserved: timesEnd)=>void
  resetTimesEnd: () => void,
}
export const useTimeReservedEnd = create<timesReservedEnd>()(
    (set)=>({
        time:null,
        setTimesReservedEnd:(newTimesReserved: timesEnd)=>set({time:newTimesReserved}),
        resetTimesEnd:()=>set({time:null})
    })
)
/* STORE HORAS DISPONIBLES */
type timeAvalaible = {
  hours: times | null
  setHourAvalaible: (newHour: times) => void
  resetHourAvalaible: () => void   
} 
export const useHourAvalaible = create<timeAvalaible>()(
  (set)=>( {
    hours: null,
    setHourAvalaible: (newHour: times)=>set({hours:newHour}),
    resetHourAvalaible: () => set({hours: null}) 
  })
)
