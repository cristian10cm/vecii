"use client";
import './index.css'
// import SearchBar from "@/components/interfaces/SearchBar/SearchBar";
import VeciiHeader from "@/components/interfaces/VeciiHeader/VeciiHeader";
import VisitorRegistries from '@/components/interfaces/VisitorRegistries/VisitorRegistries';
import { useEffect, useState } from "react";
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setHousing } from '@/components/stores/StoreHousing';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
// import { useSearchBar } from '@/components/stores/storeSearch';
import { useFilterDate } from '@/components/stores/storeFilterDate';
import LockerPublicService from '@/components/interfaces/LockerPublicService/LockerPublicService';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import { apiDataFilterDate } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import FilterDate from '@/components/interfaces/FilterDate/FilterDate';
type visitor ={
departureDate: string ,
entryDate: string,
housingLocation: string,
id: string,
status: string,
visitor: string
}
type packages ={
      approveddate:string,
      id: string,
      type: string,
      entrydate: string ,
      housing_id: string,
      housing_name: string,
      unit_id: string,
      unit_name: string
      description:string
}
const Registry = () => {
    const [seeMore,setMore ]= useState<boolean>(false) 
     const [seeMoreP,setMoreP ]= useState<boolean>(false) 
    // const {barInformation,setInformation} = useSearchBar()
    const [useCont,setCont] = useState<number>(1)
    const {setMonth,currentMonth} = useFilterDate()
    const {information} = setHousing();
    const [useData,setData] = useState<visitor[]>([])
    const [usePackages,setPackages] = useState<packages[]>([])
    const [useBoton,setBoton] = useState<boolean>(false)
    const changeOption = (data:boolean)=>{
        setBoton(data)
        setMore(false)
        setMoreP(false)
        setCont(useCont+1)
    }
   const visitante =  apiDataFilterDate(useData,'entryDate',currentMonth?.numberMont || 13,seeMore)
   const paquetes = apiDataFilterDate(usePackages,'entrydate',currentMonth?.numberMont || 13,seeMoreP)
    useEffect(() => {
    if (!information) return;
      // setInformation({inputValue:''})
    const peticion = async () => {
        try {
            const token = Cookies.get('token');
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/visit-logs`, {
                params: {
                    housingId: information.location.housing.id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(peticion.data.results)
            console.log(peticion)
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };
    const getPackages =async ()=>{
        try{
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/object-movements`,{
                params: {
                    housingId: information.location.housing.id,
                },
                headers:{
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }) 
            console.log(peticion)
            setPackages(peticion.data.results)
        }catch(err){
            console.log(err)
        }
    }
    getPackages()
    peticion();
}, [information]);
const changeMore =(data:boolean)=>{
     setMore(data)
     setMoreP(data)
}
return (
        <>
            <VeciiHeader
                srcImg="/assets/svg/historial.svg"
                name="Registros"
                transparent = {false}
            />
            <OpcionBox
                nameBox1='Visitante'
                nameBox2='Objetos'
                onClickDato={changeOption}
            />
               <FilterDate onChangeOption={changeMore} key={useCont}  />
 
               {
  useBoton ? (
    <div className='containerGrid_registries_order'>
     <>
      
      {
        
        usePackages.length > 0 ? (
          paquetes.filterData.length > 0 ? (
              
                <>
                {paquetes.filterData.map((x, k) => (
                <LockerPublicService
                  key={k}
                  dataFalse='No aprob.'
                  dataTrue='Aprobado'
                  id={x.id}
                  url='/resident/ingreso/registros/objetos-registrados/'
                  entranceObject = {true}
                  imgServicio={x.type === 'entrance' ? '/assets/svg/sign-in-bold.svg':'/assets/svg/sign-out-bold.svg'}
                  nameServicio={x.description}
                  stateServicio={x.approveddate !== null ? true:false}
                  fechaServicio={x.entrydate.split('T')[0]}
                />
                
              ))}
            {paquetes.stateSeeMore ? <BtnSeeMore enable={()=>setMoreP(true)} />:''}
             </>
          ) : (
            <LockerPublicService
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='Sin registros'
              stateServicio={false}
              fechaServicio='00/00/00'
              dataFalse='Ingreso'
              dataTrue='Salida'
            />
          )
        ) : (
            <NoApiData message='¡No tienes objetos de salida y entrada registrados Vecii!'/>
        )
      }
      </>
    </div>
  ) : (
    <div className='containerGrid_registries_order'>
      {
        useData.length > 0 ? (
          visitante.filterData.length > 0 ? (
            <>
            { visitante.filterData.map((x, k) => (
              <VisitorRegistries
                key={k}
                srcImg='https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:cfacf7cb-ed6a-5d0a-9666-b813562ad731/component?assetType=TEMPLATE&etag=c89f0ac8cffa44429198179c61aa3e29&revision=b7ea20f7-37d3-4329-92c7-11687a06537b&component_id=d1ecb99a-a6b3-4746-86c7-ef88c49baf49'
                name={x.visitor}
                complexDetails={`${information?.location.unit.name}-${information?.location.housing.name}`}
                status={x.status !== 'pending'}
                date={x.entryDate.split('T')[0]}
              />
              
            ))}
            {visitante.stateSeeMore ? <BtnSeeMore enable={()=>setMore(true)} />:''}

            </>
          )
           
          : (
            <VisitorRegistries
              srcImg='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              name='Sin registros'
              complexDetails=''
              status={false}
              date='00/00/00'
            />
          )
        ) : (
          <div className='containerGrid_message_anyVisitor'>
              <NoApiData message='¡No tienes visitas registradas Vecii!'/>
          </div>
        )
      }
    </div>
  )
}

<FooterFantasma />
        </>
    )

};

export default Registry