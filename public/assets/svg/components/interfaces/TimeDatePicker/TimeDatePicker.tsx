import './index.css'
import { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'
import {  useTimeReservedStart, useTimeReservedEnd,useHourAvalaible } from '@/components/stores/storeAvailabilityArea'
import { useEffect, useState } from 'react'

registerLocale('es', es)

const horas = [
  "00:00","01:00","02:00","03:00","04:00","05:00",
  "06:00","07:00","08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00","21:00","22:00","23:00",
  "24:00"
]

const standarHour: Record<string,string> = {
  "00:00":"12:00 am","01:00":"1:00 am","02:00":"2:00 am",
  "03:00":"3:00 am","04:00":"4:00 am","05:00":"5:00 am",
  "06:00":"6:00 am","07:00":"7:00 am","08:00":"8:00 am",
  "09:00":"9:00 am","10:00":"10:00 am","11:00":"11:00 am",
  "12:00":"12:00 pm","13:00":"1:00 pm","14:00":"2:00 pm",
  "15:00":"3:00 pm","16:00":"4:00 pm","17:00":"5:00 pm",
  "18:00":"6:00 pm","19:00":"7:00 pm","20:00":"8:00 pm",
  "21:00":"9:00 pm","22:00":"10:00 pm","23:00":"11:00 pm",
  "24:00":"12:00 am"
}

const TimeDatePicker = ({ typeTime }: { typeTime: 'start' | 'end' }) => {
  // const { setTimesReserved } = useTimeReserved()
  const hours = useHourAvalaible()
  const {setTimesReservedStart,resetTimesStart} = useTimeReservedStart()
  const {setTimesReservedEnd,resetTimesEnd} = useTimeReservedEnd()
  const resetHours = useHourAvalaible((state) => state.resetHourAvalaible)
  const [useTime, setTime] = useState<Date | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [enableOption, setEnableOption] = useState(false)

  const parseToDate = (timeStr: string): Date => {
    const d = new Date()
    const [h, m] = timeStr.split(':').map(Number)
    d.setHours(h, m, 0, 0)
    return d
  }

  const handleSelect = (value: string) => {

    if(typeTime === 'start'){
      const dateStart = parseToDate(value)
      setTime(dateStart)
      setTimesReservedStart({
          timesReservedStart:dateStart
      })
    }else{
       const dateStart = parseToDate(value)
      setTime(dateStart)
      setTimesReservedEnd({
          timesReservedEnd:dateStart
      })
    }
    // const date = parseToDate(value)
    // setTime(date)
    // setTimesReserved({
    //   timesReserved: { [typeTime]: date }
    // })
    setEnableOption(true)
  }

  useEffect(() => {
    if (!hours.hours?.timesReserved) return
    setOptions([])
    
    const fechaInicio = hours.hours?.timesReserved.start
    const fechaSalida = hours.hours?.timesReserved.end

    if (fechaInicio && fechaSalida) {
      const horEn = horas.findIndex(x => x === fechaInicio)
      const horSa = horas.findIndex(x => x === fechaSalida)

      if (horEn <= horSa) {
        setOptions(horas.slice(horEn, horSa + 1))
      } else {
        const before = horas.slice(horEn, 25)
        const after = horas.slice(1, horSa + 1)
        setOptions(before.concat(after))
      }
    }

    setTime(null)
  }, [hours.hours?.timesReserved, typeTime])

  return (
    <div>
      <select
        className='timePicker'
        onChange={(e) => handleSelect(e.target.value)}
        
      >
        <option value="" disabled={enableOption}>
          {options.length > 0 ? 'Elige una hora' : 'Elige una fecha'}
        </option>
        {options.map((x, i) => (
          <option value={x} key={i}>{standarHour[x]}</option>
        ))}
      </select>
    </div>
  )
}

export default TimeDatePicker
