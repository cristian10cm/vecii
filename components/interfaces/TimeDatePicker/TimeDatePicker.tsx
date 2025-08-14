import './index.css'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'
import { useTimeReserved, useAvailability, useHourAvalaible } from '@/components/stores/storeAvailabilityArea'
import { useEffect, useState } from 'react'

registerLocale('es', es)

const getMinTime = (minTime: string) => {
  const time = new Date()
  const [hour, minute] = minTime.split(':').map(Number)
  time.setHours(hour, minute, 0, 0)
  return time
}

const getMaxTime = (maxTime: string) => {
  const time = new Date()
  const [hour, minute] = maxTime.split(':').map(Number)
  time.setHours(hour, minute, 0, 0)
  return time
}

const TimeDatePicker = ({ typeTime }: { typeTime: 'start' | 'end' }) => {
  const hours = useHourAvalaible()
  const information = useAvailability()
  const [horaMinima, setHoraMinima] = useState<Date | null>(null)
  const [horaMaxima, setHoraMaxima] = useState<Date | null>(null)
  const [useTime, setTime] = useState<Date | null>(null)
  const { setTimesReserved } = useTimeReserved()

  const getTime = (date: Date | null) => {
    setTime(date)
    if (date) {
      setTimesReserved({
        timesReserved: {
          [typeTime]: date
        }
      })
    }
  }

  useEffect(() => {
    if (!hours.hours?.timesReserved) return

    const fechaInicio = hours.hours?.timesReserved.start
    const fechaSalida = hours.hours?.timesReserved.end

    if (fechaInicio && fechaSalida) {
      const startHour = parseInt(fechaInicio.split(':')[0], 10)
      const endHour = parseInt(fechaSalida.split(':')[0], 10)

      if (startHour > endHour) {
        // Cruza medianoche
        if (typeTime === 'start') {
          setHoraMinima(getMinTime(fechaInicio))
          setHoraMaxima(getMaxTime('23:59'))
        } else {
          setHoraMinima(getMinTime('00:00'))
          setHoraMaxima(getMaxTime(fechaSalida))
        }
      } else {
        // Rango normal
        setHoraMinima(getMinTime(fechaInicio))
        setHoraMaxima(getMaxTime(fechaSalida))
      }
    } else {
      setHoraMinima(null)
      setHoraMaxima(null)
    }

    setTime(null)
    setTimesReserved({ timesReserved: {} })
  }, [hours.hours?.timesReserved, typeTime])

  return (
    <div>
      <DatePicker
        className="timePicker_reserved_areaComun"
        showTimeSelect
        showTimeSelectOnly
        onChange={(e) => getTime(e)}
        wrapperClassName="timePicker_container"
        timeIntervals={60}
        selected={useTime}
        minTime={horaMinima || undefined}
        maxTime={horaMaxima || undefined}
        placeholderText="Selecciona hora"
        dateFormat="h:mm aa"
        locale="es"
        onKeyDown={(e) => e.preventDefault()}
      />
    </div>
  )
}

export default TimeDatePicker
