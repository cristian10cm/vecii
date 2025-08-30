'use client'
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setHousing } from '@/components/stores/StoreHousing';
import { apiDataFilterDate } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import VisitorRegistries from '@/components/interfaces/VisitorRegistries/VisitorRegistries';
import { useFilterDate } from '@/components/stores/storeFilterDate';
import FilterDate from '@/components/interfaces/FilterDate/FilterDate';

type visitor ={
  departureDate: string ,
  entryDate: string,
  housingLocation: string,
  id: string,
  status: string,
  visitor: string
}

const MisVisitas =()=>{
  const information = setHousing()
  const [seeMore,setMore ]= useState<boolean>(false) 
  const [useData,setData] = useState<visitor[]>([])
  const { currentMonth } = useFilterDate() 
  const [useCont,setCont] = useState<number>(1)

  const peticion = async () => {
    try {
      const token = Cookies.get('token');
      const peticion = await axios.get(`https://api.vecii.com.co/api/v1/visit-logs`, {
        params: {
          housingId: information.information?.location.housing.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {data} = await peticion
      setData(data.results)
      console.log(peticion)
    } catch (error) {
      console.error("Error al hacer la petición:", error);
    }
  };
   
  useEffect(()=>{
    if(!information.information?.location.housing.id) return
    peticion()
  },[information])


  const datosVisitante = apiDataFilterDate(
    useData,
    'entryDate',
    currentMonth?.numberMont || 13,
    seeMore
  )

  const changeMore =(data:boolean)=>{
    setMore(data)
    
  }

  return (
    <>
      <VeciiHeader
        srcImg='/assets/svg/Ingreso.svg'
        name= 'Mis visitas'
        transparent={false}
      />

      <FilterDate onChangeOption={changeMore} key={useCont} />

      <div className='container_myVisitors'>
        {
          useData.length > 0 ? (
            datosVisitante.filterData.length > 0 ? (
              <>
                { datosVisitante.filterData.map((x,k)=>(
                  <VisitorRegistries
                    key={k}
                    srcImg='https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:cfacf7cb-ed6a-5d0a-9666-b813562ad731/component?assetType=TEMPLATE&etag=c89f0ac8cffa44429198179c61aa3e29&revision=b7ea20f7-37d3-4329-92c7-11687a06537b&component_id=d1ecb99a-a6b3-4746-86c7-ef88c49baf49'
                    name={x.visitor}
                    complexDetails={`${information.information?.location.unit.name}-${information.information?.location.housing.name}`}
                    status={x.status !== 'pending'}
                    date={x.entryDate.split('T')[0]}
                  />
                ))}
                { datosVisitante.stateSeeMore ? (
                  <BtnSeeMore enable={()=>setMore(true)} />
                ) : '' }
              </>
            ) : (
              <VisitorRegistries
                srcImg='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                name='Sin registros'
                complexDetails=''
                status={false}
                date='00/00/00'
              />
            )
          ) : (
            <NoApiData message='¡No tienes visitas registradas Vecii!'/>
          )
        }
      </div>


    </>
  )
}
export default MisVisitas
