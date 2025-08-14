'use client'
import './index.css'
import StateComponent from '@/components/interfaces/StateComponent/StateComponent'
import GoTo from '@/components/logics/GoTo'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useAvailability } from '@/components/stores/storeAvailabilityArea'
import { placeInterface, dias  } from '.'
import { nextDay } from 'date-fns'
const PlacesComponents = ({idPlace,pathPlace,stateOpcion,namePlace,datePlace,statePlace}: {idPlace: string,pathPlace: string,stateOpcion:boolean,namePlace?:string,datePlace?:string,statePlace?:string}) => {
  const [usePlace, setPlace] = useState<placeInterface | null>(null)
  const [useDays, setDays] = useState<string | null>(null)
  const [useStateOpcion,setStateOpcion] = useState<boolean>()
  const {setAvailability} = useAvailability()
  const dias: dias[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]
//    const diasTraducidos: Partial<Record<string,string>>={
//   monday: 'Lunes',
//   tuesday: 'Martes',
//   wednesday: 'Miércoles',
//   thursday: 'Jueves',
//   friday: 'Viernes',
//   saturday: 'Sábado',
//   sunday: 'Domingo',
// }  
  const goToPath = GoTo()
  const reservar = ()=>{
    goToPath({ path: pathPlace })
   if(usePlace){
     setAvailability({
      availability:usePlace?.availability
    }) 
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
        console.log(peticion)
        setPlace(peticion.data)

      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    if (!idPlace) return 
    setStateOpcion(stateOpcion)  
    if(stateOpcion){    
    setDays(diaDisponible || null)
    const date = new Date();
    const fecha = nextDay(date,1)
    console.log(fecha)
    peticionPlace()
      }
  }, [idPlace,stateOpcion])
  const diaDisponible = dias.find((x) => usePlace?.availability[x])

  return (
    <div>
      {
        useStateOpcion ?
        <div className='container_places' onClick={reservar}> 
            <div className='container_places-info'>
            <p className='container_places_namePlace'>{usePlace?.name}</p>
            <p className='container_places_timeReserved'>{}</p>
      </div>
      <div className='container_places-status'>
        <StateComponent
          statusComp={false}
          dataTrue='Completado'
          dataFalse='Pendiente'
        />
        <p className='container_places_price'>${usePlace?.hourlyRate}</p>
      </div>
    </div>:
      <div className='container_places' > 
            <div className='container_places-info'>
            <p className='container_places_namePlace'>{namePlace || 'Cargando..'}</p>
            <p className='container_places_timeReserved'>{datePlace?.split('T')[0] || 'Cargando..'}</p>
      </div>
      <div className='container_places-status'>
        <StateComponent
          statusComp={false}
          dataTrue='Completado'
          dataFalse='Pendiente'
        />
      </div>
    </div>
    
      }
    </div>
  )
}

export default PlacesComponents