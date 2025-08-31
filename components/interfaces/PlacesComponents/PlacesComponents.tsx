'use client'
import './index.css'
import StateComponent from '@/components/interfaces/StateComponent/StateComponent'
import GoTo from '@/components/logics/GoTo'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { addDays, nextDay } from 'date-fns'
import { useAvailability } from '@/components/stores/storeAvailabilityArea'
import { placeInterface, dias, TimeRange } from '.'

const PlacesComponents = ({idPlace,pathPlace,stateOpcion,namePlace,datePlace,statePlace}: {idPlace: string,pathPlace: string,stateOpcion:boolean,namePlace?:string,datePlace?:string,statePlace?:boolean}) => {
  const [usePlace, setPlace] = useState<placeInterface | null>(null)
  const [useStateOpcion,setStateOpcion] = useState<boolean>()
  const {setAvailability,resetAvailability} = useAvailability()
  const goToPath = GoTo()


  const reservar = ()=>{
    useAvailability.persist.clearStorage()
    resetAvailability()
    goToPath({ path: pathPlace })
    if(usePlace){
      setAvailability({availability:usePlace?.availability}) 
      localStorage.setItem('namePlaceReserved',usePlace.name)
      localStorage.setItem('idZonaComun',usePlace.id)
    }
  }

  const peticionPlace = async () => {
    try {
      const peticion = await axios.get(
        `https://api.vecii.com.co/api/v1/common-areas/${idPlace}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      setPlace(peticion.data)
     
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
    if (!idPlace) return
    setStateOpcion(stateOpcion)
    if(stateOpcion){    
      peticionPlace()
    }
  }, [idPlace,stateOpcion])

  useEffect(() => {
   
    if (!usePlace) return
    localStorage.setItem("namePlaceReserved", usePlace.name)
    console.log(usePlace.name)
    console.log(usePlace.availability)
    localStorage.setItem("idZonaComun", usePlace.id)
  }, [usePlace])
const formatoMoneda = new Intl.NumberFormat('es-ES', {});
  const getDate = (availability: Partial<Record<dias, TimeRange>>): string | null => {
    if (!availability) return null
    const today = new Date().getDay()
    const numDias: Record<number, dias> = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    }
    const availableDays = Object.keys(availability).filter(
      (d) => availability[d as dias]?.start
    ) as dias[]
    if (availableDays.length === 0) return null
    if (availableDays.includes(numDias[today])) {
      return new Date().toISOString().split("T")[0]
    }
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (today + i) % 7
      const nextDayName = numDias[nextDayIndex]
      if (availableDays.includes(nextDayName)) {
        return addDays(new Date(), i).toISOString().split("T")[0]
      }
    }
    return null
  }

  const diaDisponible = usePlace ?  getDate(usePlace?.availability) : 'Cargando..'  

  return (
    <div>
      {
        useStateOpcion ?
        <div className='container_places' onClick={reservar}> 
          <div className='container_places-info'>
            <p className='container_places_namePlace'>{usePlace?.name}</p>
            <p className='container_places_timeReserved'>{diaDisponible}</p>
          </div>
          <div className='container_places-status'>
            <StateComponent
              statusComp={statePlace}
              dataTrue='Tiene costo'
              dataFalse='Sin costo'
            />
            <p className='container_places_price'>${formatoMoneda.format(Number(usePlace?.hourlyRate))}</p>
          </div>
        </div>:
        <div className='container_places'> 
          <div className='container_places-info'>
            <p className='container_places_namePlace'>{namePlace || 'Cargando..'}</p>
            <p className='container_places_timeReserved'>{datePlace?.split('T')[0] || 'Cargando..'}</p>
          </div>
          <div className='container_places-status'>
            <StateComponent
              statusComp={statePlace}
              dataTrue='Aprobado'
              dataFalse='No aprobado'
            />
          </div>
        </div>
      }
    </div>
  )
}

export default PlacesComponents
